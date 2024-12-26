import Now from "@/components/utils/TimeNow";
import MailgunClient, { MailgunClientConfig } from "@/lib/Mailgun";
import DBConnect from "@/lib/Mongoose";
import Account from "@/model/Account";
import PasswordReset from "@/model/PasswordReset";
import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await DBConnect();

  const searchParams = request.nextUrl.searchParams;
  const guid = searchParams.get("guid");

  if (!guid) {
    return NextResponse.json(
      { success: false, message: "GUID/Token must be provided" },
      { status: 400 }
    );
  }

  try {
    const passwordReset = await PasswordReset.findOne({
      guid: guid,
    });
    if (!passwordReset) {
      return NextResponse.json(
        { success: false, type: "bad-token", message: "Invalid token" },
        { status: 400 }
      );
    }

    const validUntil = new Date(passwordReset.validUntil);
    validUntil.setMinutes(
      validUntil.getMinutes() - validUntil.getTimezoneOffset()
    );

    if (Now() > validUntil) {
      return NextResponse.json(
        {
          success: false,
          type: "expired-token",
          message: "The token has expired",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "There was an error verifying the password reset token",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await DBConnect();

  const mailgun = MailgunClient();

  const reqBody = await request.json();

  if (!reqBody.email) {
    return NextResponse.json(
      { success: false, message: "Email has to be provided" },
      { status: 400 }
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const validateAccountEmail = await Account.findOne({
      email: reqBody.email,
    });
    if (!validateAccountEmail) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          success: false,
          type: "no-account",
          message: "Email is not registered",
        },
        { status: 404 }
      );
    }

    let guid = "";
    do {
      guid = crypto.randomUUID();
    } while (await PasswordReset.findOne({ guid: guid, email: reqBody.email }));

    await PasswordReset.create(
      [
        {
          guid: guid,
          email: reqBody.email,
          validUntil: Now().getTime() + 30 * 60 * 1000,
        },
      ],
      { session }
    );

    if (!mailgun) {
      await session.commitTransaction();
      session.endSession();

      console.error(
        "Mailgun API Key or Domain not set - Skipping email delivery\nLook in database for guid"
      );
      return NextResponse.json({ success: true });
    } else {
      await sendEmailVerification(mailgun, reqBody.email, guid);
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      {
        success: false,
        message:
          "There was an error generating the password reset token or sending the email",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  await DBConnect();

  const reqBody = await request.json();

  if (!reqBody.password) {
    return NextResponse.json(
      { success: false, message: "New password must be provided" },
      { status: 400 }
    );
  }

  if (!reqBody.guid) {
    return NextResponse.json(
      { success: false, message: "GUID/Token must be provided" },
      { status: 400 }
    );
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(reqBody.password, salt);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const passwordReset = await PasswordReset.findOne({
      guid: reqBody.guid,
    });
    if (!passwordReset) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { success: false, type: "bad-token", message: "Invalid token" },
        { status: 400 }
      );
    }

    const validUntil = new Date(passwordReset.validUntil);
    validUntil.setMinutes(
      validUntil.getMinutes() - validUntil.getTimezoneOffset()
    );

    if (Now() > validUntil) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          success: false,
          type: "expired-token",
          message: "The token has expired",
        },
        { status: 400 }
      );
    }

    const account = await Account.findOne({
      email: passwordReset.email,
    });
    if (!account) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { success: false, message: "Account not found" },
        { status: 404 }
      );
    }

    await PasswordReset.deleteOne({ guid: reqBody.guid }, { session }).exec();

    await Account.updateOne(
      { _id: account._id },
      {
        $set: {
          password: hashedPassword,
        },
      },
      { session }
    ).exec();

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      {
        success: false,
        message: "There was an error resetting the password",
      },
      { status: 500 }
    );
  }
}

async function sendEmailVerification(
  mailgun: MailgunClientConfig,
  email: string,
  guid: string
) {
  const htmlContent =
    "<!DOCTYPE html>" +
    '<html lang="de">' +
    "<head>" +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<link rel="stylesheet" href="https://use.typekit.net/hvt7naw.css">' +
    "<style>" +
    ":root {" +
    "--text: #1C1D1D;" +
    "--background: #F7F3F5;" +
    "--primary: #F07DDC;" +
    "--primary-slanted: #F8C1EE;" +
    "--muted: #636363;" +
    "--success: #1bcb21;" +
    "--error: #f44336;" +
    "--popover: 0, 0%, 96%;" +
    '--mencken: "mencken-std-head", sans-serif;' +
    '--merriweather: "merriweather", serif;' +
    "}" +
    "body, html {" +
    "margin: 0;" +
    "padding: 0;" +
    "box-sizing: border-box;" +
    "background-color: var(--background);" +
    "font-family: var(--merriweather);" +
    "color: var(--text);" +
    "}" +
    "p, .btn {" +
    "font-family: var(--merriweather);" +
    "font-weight: 400;" +
    "font-size: 14px;" +
    "color: var(--text);" +
    "}" +
    ".btn-container {" +
    "display: flex;" +
    "flex-direction: column;" +
    "gap: 0.5rem;" +
    "margin: 2rem 0;" +
    "}" +
    ".btn-container p {" +
    "margin: 0;" +
    "color: var(--muted);" +
    "}" +
    ".btn {" +
    "padding: 0.75rem 1.75rem;" +
    "border-radius: 9999px;" +
    "display: flex;" +
    "justify-content: center;" +
    "align-items: center;" +
    "width: auto;" +
    "transition: all 0.3s;" +
    "background-color: transparent;" +
    "color: var(--text);" +
    "text-decoration: none;" +
    "border: 2px solid var(--text);" +
    "}" +
    ".btn:hover {" +
    "background-color: var(--text);" +
    "color: var(--background);" +
    "}" +
    ".wrapper {" +
    "margin: 0 auto;" +
    "max-width: 500px;" +
    "padding: 50px 40px;" +
    "height: calc(100vh - 100px);" +
    "display: flex;" +
    "flex-direction: column;" +
    "}" +
    ".brand-logo {" +
    "width: 250px;" +
    "display: block;" +
    "}" +
    ".container {" +
    "margin-top: 40px;" +
    "}" +
    ".my {" +
    "font-size: 34px;" +
    "margin: 40px 0;" +
    "}" +
    ".copyright {" +
    "font-size: 12px;" +
    "padding: 50px 0px;" +
    "text-align: center;" +
    "}" +
    ".token-text {" +
    "font-size: 12px;" +
    "color: var(--muted);" +
    "font-family: var(--merriweather);" +
    "font-weight: 400;" +
    "margin-top: 5px;" +
    "}" +
    "@media screen and (max-width: 560px) {" +
    ".wrapper {" +
    "padding: 40px 20px;" +
    "}" +
    "}" +
    "</style>" +
    "</head>" +
    "<body>" +
    '<div class="wrapper">' +
    '<img src="https://www.praiseconnect.ch/images/Logo-PraiseConnect.png" alt="PraiseConnect Logo" class="brand-logo">' +
    '<div class="container">' +
    "<p>Klicke auf den Knopf um dein Passwort zurückzusetzen</p>" +
    '<div class="btn-container">' +
    '<a target="_blank" href="' +
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") +
    "/passwort-reset?token=" +
    guid +
    '" class="btn">Passwort zurücksetzen</a>' +
    '<p class="token-text">Token: ' + guid + '</p>' +
    "</div>" +
    "<p>Dieser Token ist 30 Minuten lang gültig. <br /><br />Wenn du diesen Token nicht angefordert hast, kannst du diese E-Mail ignorieren, da deine E-Mail-Adresse u. U. versehentlich von einer anderen Person eingegeben wurde.<br /><br />- Dein PraiseConnect Team</p>" +
    "</div>" +
    '<p class="copyright">© 2024 PraiseConnect, All rights reserved.</p>' +
    "</div>" +
    "</body>" +
    "</html>";

  await mailgun.mailgun.messages.create(mailgun.domain, {
    to: email,
    from: "PraiseConnect <no-reply@praiseconnect.ch>",
    subject: "Passwort zurücksetzen",
    text: "Passwort zurücksetzen",
    html: htmlContent,
  });
}

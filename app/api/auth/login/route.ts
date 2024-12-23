import { NextResponse } from "next/server";
import { encrypt } from "@/lib/Session";
import Account, { AccountDTO } from "@/model/Account";
import DBConnect from "@/lib/Mongoose";
import { compare } from "bcrypt";
import { PayloadDTO } from "@/model/PayloadDTO";

export async function POST(request: Request) {
  await DBConnect();

  const reqBody = await request.json() as AccountDTO;

  try {
    if (!reqBody.email || !reqBody.password) {
      return NextResponse.json(
        {
          success: false,
          message: "E-Mail und Passwort muss vorhanden sein",
        },
        { status: 400 }
      );
    }

    const account = await Account.findOne({ email: reqBody.email });
    if (!account) {
      return NextResponse.json(
        {
          success: false,
          type: "wrong-credentials",
          message: "E-Mail oder Passwort ist falsch",
        },
        { status: 400 }
      );
    }

    const match = await compare(reqBody.password, account.password);
    if (!match) {
      return NextResponse.json(
        {
          success: false,
          type: "wrong-credentials",
          message: "E-Mail oder Passwort ist falsch",
        },
        { status: 400 }
      );
    }

    const payload: PayloadDTO = {
      _id: account._id,
      email: account.email
    };

    const jwtToken = await encrypt(payload);

    return NextResponse.json(
      { success: true },
      { status: 200, headers: { accessToken: `Bearer ${jwtToken}` } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Es gab einen Fehler bei der Anmeldung" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import DBConnect from "@/lib/Mongoose";
import { decrypt, encrypt } from "@/lib/Session";
import Account, { AccountDTO } from "@/model/Account";
import Now from "@/components/utils/TimeNow";
import { PayloadDTO } from "@/model/PayloadDTO";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await DBConnect();

  const { id } = await params;

  const jwtToken = request.headers.get("authorization");
  const payload = await decrypt(jwtToken);

  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const account = await Account.findById(id).select("-password");

    if (!account) {
      return NextResponse.json(
        { success: false, message: "Account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch account with id: " + id },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await DBConnect();

  const { id } = await params;

  const jwtToken = request.headers.get("authorization");
  const payload = await decrypt(jwtToken);

  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const reqBody = (await request.json()) as AccountDTO;

  if (!reqBody.email || !reqBody.birthdate || !reqBody.name) {
    return NextResponse.json(
      { success: false, message: "Please provide all fields" },
      { status: 400 }
    );
  }

  try {
    const account = await Account.findById(id);

    if (!account) {
      return NextResponse.json(
        { success: false, message: "Account not found" },
        { status: 404 }
      );
    }

    if (account._id.toString() !== payload._id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const originalEmail = account.email;

    if (originalEmail !== reqBody.email) {
      const emailExists = await Account.findOne({ email: reqBody.email });
      if (emailExists) {
        return NextResponse.json(
          { success: false, message: "Email already in use" },
          { status: 409 }
        );
      }
    }

    account.email = reqBody.email;
    account.birthdate = reqBody.birthdate;
    account.name = reqBody.name;
    account.updatedAt = Now();

    await account.save();

    if (originalEmail !== reqBody.email) {
      const payload: PayloadDTO = {
        _id: account._id,
        email: reqBody.email,
      };

      const jwtToken = await encrypt(payload);

      return NextResponse.json(
        { success: true },
        { status: 200, headers: { accessToken: `Bearer ${jwtToken}` } }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update account" },
      { status: 400 }
    );
  }
}

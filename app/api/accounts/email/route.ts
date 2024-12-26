import { NextRequest, NextResponse } from "next/server";
import DBConnect from "@/lib/Mongoose";
import { decrypt } from "@/lib/Session";
import Account from "@/model/Account";

export async function GET(request: NextRequest) {
  await DBConnect();

  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Email not provided" },
      { status: 400 }
    );
  }

  const jwtToken = request.headers.get("authorization");
  const payload = await decrypt(jwtToken);

  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const account = await Account.findOne({ email: email });

    return NextResponse.json({ success: !account ? true : false }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch account with email: " + email },
      { status: 400 }
    );
  }
}

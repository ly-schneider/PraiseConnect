import { encrypt } from "@/lib/Session";
import { NextResponse } from "next/server";
import Account, { AccountDTO } from "@/model/Account";
import DBConnect from "@/lib/Mongoose";
import { PayloadDTO } from "@/model/PayloadDTO";
import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";
import Now from "@/components/utils/TimeNow";

export async function POST(request: Request) {
  await DBConnect();

  const reqBody = await request.json() as AccountDTO;

  if (!reqBody.email) {
    return NextResponse.json(
      { success: false, message: "E-Mail is required" },
      { status: 400 }
    );
  }

  if (!reqBody.password) {
    return NextResponse.json(
      { success: false, message: "Password is required" },
      { status: 400 }
    );
  }

  if (!reqBody.name) {
    return NextResponse.json(
      { success: false, message: "Name is required" },
      { status: 400 }
    );
  }

  if (!reqBody.birthdate) {
    return NextResponse.json(
      { success: false, message: "Birthdate is required" },
      { status: 400 }
    );
  }

  if (!reqBody.terms) {
    return NextResponse.json(
      { success: false, message: "Terms is required" },
      { status: 400 }
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const validateAccountEmail = await Account.findOne({
      email: reqBody.email,
    });
    if (validateAccountEmail) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { success: false, message: "E-Mail ist bereits registriert" },
        { status: 409 }
      );
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(reqBody.password, salt);

    const account = new Account({
      email: reqBody.email,
      password: hashedPassword,
      name: reqBody.name,
      birthdate: reqBody.birthdate,
      terms: reqBody.terms,
      createdAt: Now(),
      updatedAt: Now(),
    });

    await account.save({ session });

    const payload: PayloadDTO = {
      _id: account._id,
      email: reqBody.email,
    };

    const jwtToken = await encrypt(payload);

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      { success: true },
      { status: 201, headers: { accessToken: `Bearer ${jwtToken}` } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to add data" },
      { status: 400 }
    );
  }
}
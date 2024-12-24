import { NextResponse } from "next/server";
import DBConnect from "@/lib/Mongoose";
import { decrypt } from "@/lib/Session";
import Account from "@/model/Account";
import Chat from "@/model/Chat";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
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
    const chat = await Chat.findOne({ _id: id, participants: payload._id })
          .populate("participants", "name birthdate", Account)
          .populate("messages.sender", "name birthdate", Account)
          .exec();

    if (!chat) {
      return NextResponse.json(
        { success: false, message: "Chat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: chat }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch chat with id: " + id },
      { status: 400 }
    );
  }
}

export async function POST(
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

  const reqBody = await request.json();

  if (!reqBody.content) {
    return NextResponse.json(
      { success: false, message: "Message content is required" },
      { status: 400 }
    );
  }

  try {
    const account = await Account.findOne({ _id: payload._id });
    if (!account) {
      return NextResponse.json(
        { success: false, message: "Account not found" },
        { status: 404 }
      );
    }

    const chat = await Chat.findOne({ _id: id, participants: payload._id });

    if (!chat) {
      return NextResponse.json(
        { success: false, message: "Chat not found" },
        { status: 404 }
      );
    }

    let message = {
      sender: payload._id,
      content: reqBody.content,
      createdAt: new Date(),
    };

    chat.messages.push(message);

    for (const participantId of chat.participants) {
      if (participantId.toString() !== payload._id) {
        chat.readBy.set(participantId.toString(), null);
      }
    }

    await chat.save();

    message = {
      ...message,
      sender: { _id: account._id, name: account.name, birthdate: account.birthdate },
    }

    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to send message to chat with id: " + id },
      { status: 400 }
    );
  }
}
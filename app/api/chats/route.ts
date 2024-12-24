import { NextResponse } from "next/server";
import DBConnect from "@/lib/Mongoose";
import mongoose from "mongoose";
import Now from "@/components/utils/TimeNow";
import Post from "@/model/Post";
import { decrypt } from "@/lib/Session";
import Chat from "@/model/Chat";
import Account from "@/model/Account";

export async function GET(request: Request) {
  await DBConnect();

  const jwtToken = request.headers.get("authorization");
  const payload = await decrypt(jwtToken);

  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const chats = await Chat.find({ participants: payload._id })
      .populate("participants", "name birthdate", Account)
      .populate("messages.sender", "name birthdate", Account)
      .exec();

    return NextResponse.json({ success: true, data: chats }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await DBConnect();

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
      { success: false, message: "Content is required" },
      { status: 400 }
    );
  }

  if (!reqBody.postId) {
    return NextResponse.json(
      { success: false, message: "Post ID is required" },
      { status: 400 }
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const post = await Post.findById(reqBody.postId);
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    if (post.account.toString() === payload._id) {
      return NextResponse.json(
        { success: false, message: "You can't chat with yourself" },
        { status: 400 }
      );
    }

    let chat = await Chat.findOne({
      participants: { $all: [payload._id, post.account] },
    });

    const postId = reqBody.postId;
    const postUrl = `/posts/id/${postId}`;

    if (chat) {
      chat.messages.push({
        sender: payload._id,
        content: `${reqBody.content}\n\n[Beitrag](${postUrl})`,
        createdAt: Now(),
      });

      chat.readBy.set(payload._id, Now());
    } else {
      const readByMap = new Map();
      readByMap.set(payload._id, Now());

      chat = new Chat({
        participants: [payload._id, post.account],
        messages: [
          {
            sender: payload._id,
            content: `${reqBody.content}\n\n[Beitrag](${postUrl})`,
            createdAt: Now(),
          },
        ],
        readBy: readByMap,
      });
    }

    await chat.save({ session });

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { success: false, message: "Failed to add data" },
      { status: 400 }
    );
  }
}

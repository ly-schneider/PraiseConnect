import { NextResponse } from "next/server";
import DBConnect from "@/lib/Mongoose";
import mongoose from "mongoose";
import Now from "@/components/utils/TimeNow";
import Post, { PostDTO } from "@/model/Post";
import { decrypt } from "@/lib/Session";
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
    const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("account", "name birthdate", Account);

    return NextResponse.json(
      { success: true, data: posts },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
      { status: 400 }
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

  const reqBody = await request.json() as PostDTO;

  if (!reqBody.content) {
    return NextResponse.json(
      { success: false, message: "Content is required" },
      { status: 400 }
    );
  }

  const mongooseSession = await mongoose.startSession();

  try {
    mongooseSession.startTransaction();

    const post = new Post({
      content: reqBody.content,
      activities: reqBody.activities,
      account: payload._id,
      createdAt: Now(),
      updatedAt: Now(),
    });

    await post.save({ mongooseSession });

    await mongooseSession.commitTransaction();
    mongooseSession.endSession();

    const data: PostDTO = {
      _id: post._id
    };

    return NextResponse.json(
      { success: true, data: data },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to add data" },
      { status: 400 }
    );
  }
}
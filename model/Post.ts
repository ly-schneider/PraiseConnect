import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content darf nicht leer sein"],
  },
  activities: [
    {
      type: String,
    },
  ],
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export type PostDTO = {
  _id?: string;
  content?: string;
  activities?: string[];
  account?: { _id: string; name: string; birthdate: Date };
  createdAt?: Date;
  updatedAt?: Date;
};

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

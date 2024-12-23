import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content darf nicht leer sein"],
  },
  category: [
    {
      type: String,
      required: [true, "Kategorie darf nicht leer sein"],
    },
  ],
  accountId: {
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

export default mongoose.models.Post ||
  mongoose.model("Post", PostSchema);

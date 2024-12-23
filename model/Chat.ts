import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Teilnehmer darf nicht leer sein"],
    },
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: [true, "Sender darf nicht leer sein"],
      },
      content: {
        type: String,
        required: [true, "Inhalt darf nicht leer sein"],
      },
      timestamp: {
        type: Date,
        default: Date.now,
        required: true,
      },
    },
  ],
});

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

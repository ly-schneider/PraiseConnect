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
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  readBy: {
    type: Map,
    of: Date, // Stores the last read timestamp for each participant
  },
});

export type ChatDTO = {
  _id?: string;
  participants?: { _id: string; name: string; birthdate: Date }[];
  messages?: {
    _id?: string;
    sender?: { _id: string; name: string; birthdate: Date };
    content?: string;
    createdAt?: Date;
  }[];
  readBy?: Map<string, Date>;
}

export type ChatMessageDTO = {
  _id?: string;
  sender?: {
      _id: string;
      name: string;
      birthdate: Date;
  };
  content?: string;
  createdAt?: Date;
}

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

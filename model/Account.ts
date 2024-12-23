import { CheckedState } from "@radix-ui/react-checkbox";
import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "E-Mail darf nicht leer sein"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Passwort darf nicht leer sein"],
  },
  name: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  terms: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export type AccountDTO = {
  _id?: string;
  email?: string;
  password?: string;
  name?: string;
  birthdate?: Date;
  terms?: CheckedState,
  createdAt?: Date;
  updatedAt?: Date;
}

export default mongoose.models.Account ||
  mongoose.model("Account", AccountSchema);

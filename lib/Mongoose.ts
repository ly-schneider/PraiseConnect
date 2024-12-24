import mongoose, { Connection } from "mongoose";

declare global {
  var mongoose: { conn: Connection | null; promise: Promise<Connection> | null } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("No MONGODB_URI environment variable inside .env.local");
}

// Ensure global mongoose cache exists
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const cached = global.mongoose;

export default async function DBConnect(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
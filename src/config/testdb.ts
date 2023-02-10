import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = new MongoMemoryServer();

export const dbConnect = async (): Promise<void> => {
  const uri = await mongoServer.getUri();

  mongoose
    .connect(uri)
    .then(() => console.log("info", "connected to memory-server"))
    .catch(() => console.log("error", "could not connect"));
};

export const dbDisconnect = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};
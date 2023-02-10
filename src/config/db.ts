import mongoose from "mongoose";

const message =
  process.env.NODE_ENV !== "production"
    ? "Successfully connected to MongoDB Atlas!"
    : "Successfully connected to MongoDB Local!";

const connectDB = () => {
  const url: string = process.env.DATABASE_URL as string;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(url)
    .then(() => {
      console.log("***", message);
    })
    .catch((error) => {
      console.log("*%^*", error.message);
    });
};
export default connectDB;
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Add MONGODB_URI in .env file");
}

async function connectDB() {
  await mongoose.connect(MONGODB_URI, {
    dbName: "myBlogs", 
  });
  console.log("MongoDB Connected");
}

export default connectDB;
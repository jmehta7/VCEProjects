import mongoose from "mongoose";
console.log("dkfdk",process.env.MONGODB_URI)
const connectMongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: "portfolio", 
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectMongoDB;

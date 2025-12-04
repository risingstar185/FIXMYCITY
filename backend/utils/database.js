import mongoose from "mongoose";

 export const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URL;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};


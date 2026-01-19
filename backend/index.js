import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./utils/database.js";
import { authRoute } from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/userRoute.js";
import complaintRouter from "./routes/productRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
//midleware
app.use(cookieParser());


app.use(cors({ origin: [
   "https://fixmycity-admin.onrender.com/",
   "https://fixmycity-1ghy.onrender.com/",
],
   credentials: true }));

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/complaint",complaintRouter);

// connect DB
connectDb();

// start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

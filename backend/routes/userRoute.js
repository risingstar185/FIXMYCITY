import express from "express";
import { getCurrentUser,getCurrentAdmin } from "../controller/userController.js";
import { isAuth } from "../middleware/isAuth.js";
import adminAuth  from "../middleware/adminAuth.js";

export const userRoute = express.Router();

userRoute.get("/getCurrentUser",isAuth, getCurrentUser);

userRoute.get("/getAdminUsers",adminAuth, getCurrentAdmin);

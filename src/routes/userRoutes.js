import express from "express";
import { getProfile, getUsers } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/profile", authMiddleware, getProfile);

export default router;

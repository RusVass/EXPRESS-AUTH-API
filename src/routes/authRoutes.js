import express from "express";
import rateLimit from "express-rate-limit";
import { login, register } from "../controllers/authController.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { registerSchema, loginSchema } from "../validators/authSchemas.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { message: "Too many attempts, please try again later" },
});

router.post("/register", authLimiter, validateMiddleware(registerSchema), register);
router.post("/login", authLimiter, validateMiddleware(loginSchema), login);

export default router;

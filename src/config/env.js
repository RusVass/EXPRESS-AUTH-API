import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

export const env = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};

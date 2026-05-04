import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header is missing",
    });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Invalid authorization format",
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError" ? "Token has expired" : "Invalid token";
    return res.status(401).json({ message });
  }
};

export default authMiddleware;

import { catchAsync } from "../utils/catchAsync.js";
import { registerUser, loginUser } from "../services/authService.js";

export const register = catchAsync(async (req, res) => {
  const user = await registerUser(req.body);

  return res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

export const login = catchAsync(async (req, res) => {
  const result = await loginUser(req.body);

  return res.status(200).json({
    message: "Login successful",
    token: result.token,
    user: result.user,
  });
});

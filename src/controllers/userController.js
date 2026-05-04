import { catchAsync } from "../utils/catchAsync.js";
import { getAllUsers, getUserProfile } from "../services/userService.js";

export const getUsers = catchAsync(async (req, res) => {
  const users = getAllUsers();

  return res.status(200).json(users);
});

export const getProfile = catchAsync(async (req, res) => {
  const user = getUserProfile(req.user.userId);

  return res.status(200).json(user);
});

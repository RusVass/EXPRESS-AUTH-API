import { users } from "../data/users.js";
import { getSafeUser } from "../utils/formatUser.js";

export const getAllUsers = () => {
  return users.map(getSafeUser);
};

export const getUserProfile = (userId) => {
  const user = users.find((item) => item.id === userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return getSafeUser(user);
};

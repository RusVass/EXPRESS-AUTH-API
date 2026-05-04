import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { users } from "../data/users.js";
import { generateToken } from "../utils/jwt.js";
import { getSafeUser } from "../utils/formatUser.js";

const findUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

export const registerUser = async ({ name, email, password }) => {
  const existingUser = findUserByEmail(email);

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: randomUUID(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  return getSafeUser(newUser);
};

export const loginUser = async ({ email, password }) => {
  const user = findUserByEmail(email);

  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    token,
    user: getSafeUser(user),
  };
};

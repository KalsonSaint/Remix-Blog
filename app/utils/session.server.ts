import bcrypt from "bcrypt";
import { createCookieSessionStorage, redirect } from "remix";
import { db } from "./db.server";

//Login User
export const login = async ({ username, password }) => {
  const user = await db.user.findUnique({
    where: { username },
  });
  if (!user) return null;

  // Check Password
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) return null;

  return user;
};

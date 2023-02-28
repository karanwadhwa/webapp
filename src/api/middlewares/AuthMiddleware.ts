import express from "express";
import bcrypt from "bcryptjs";
import UserService from "../services/UserService";

const userService = new UserService();

export interface AuthenticatedRequest extends express.Request {
  user?: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    account_created: Date;
    account_updated: Date;
  };
}

export default async function (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.header("authorization");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication required to access this route" });
  }

  try {
    const encoded = token.split(" ")[1];
    const decoded = Buffer.from(encoded, "base64").toString();
    const [username, password] = decoded.split(":");

    let user = await userService.findByUsername(username, true);
    if (user && bcrypt.compareSync(password, user?.password)) {
      user = user.toJSON();
      delete user.password;
      req.user = user;
      next();
    } else return res.status(401).json({ error: "Invalid credentials" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Invalid authentication token" });
  }
}

import express from "express";
import { validationResult } from "express-validator";
import { RequestUserAuth } from "../middlewares/AuthMiddleware";
import UserService from "../services/UserService";

const userService = new UserService();

class UserController {
  constructor() {}

  createUser = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const user = await userService.findByUsername(req.body.username);
    if (user)
      return res.status(400).json({ error: "An account with that username already exists" });

    let created = await userService.create(req.body);
    return res.status(200).json({ user: created });
  };

  getUserProfile = (req: RequestUserAuth, res: express.Response): express.Response => {
    if (req.user.id === parseInt(req.params.userId))
      return res.status(200).json({ user: req.user });

    return res.status(403).json({ error: "You do not have access to this data" });
  };
}

export default UserController;

import express from "express";
import { RequestUserAuth } from "../middlewares/AuthMiddleware";
import UserService from "../services/UserService";
import RootController from "./RootController";

const userService = new UserService();

class UserController extends RootController {
  constructor() {
    super();
  }

  createUser = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const user = await userService.findByUsername(req.body.username);
    if (user)
      return res.status(400).json({ error: "An account with that username already exists" });

    let created = await userService.create(req.body);
    return res.status(201).json({ user: created });
  };

  getUserProfile = (req: RequestUserAuth, res: express.Response): express.Response => {
    if (req.user.id === parseInt(req.params.userId))
      return res.status(200).json({ user: req.user });

    return res.status(403).json({ error: "You do not have access to this data" });
  };

  updateUser = async (req: RequestUserAuth, res: express.Response): Promise<express.Response> => {
    if (req.user.id !== parseInt(req.params.userId))
      return res.status(403).json({ error: "You do not have access to this data" });

    if (req.user.username !== req.body.username)
      return res.status(400).json({ error: "Incorrect username" });

    const updatedUser = userService.updateUser(req.body, parseInt(req.params.userId));
    console.log(updatedUser);
    return res.sendStatus(204);
  };
}

export default UserController;

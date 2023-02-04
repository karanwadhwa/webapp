import express from "express";
import UserService from "../services/UserService";

const userService = new UserService();

class UserController {
  constructor() {}

  createUser = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const user = await userService.findByUsername(req.body.username);
    if (user)
      return res.status(400).json({ error: "An account with that username already exists" });

    let created = await userService.create(req.body);
    // created = created.toJSON();
    // delete created.password;
    return res.status(200).json({ user: created });
  };
}

export default UserController;

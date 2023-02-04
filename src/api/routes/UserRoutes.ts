import * as express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();
const controller = new UserController();

// @route   GET /v1/user/
// @desc    NOT IMPLEMENTED
// @access  Private
router.get("/", (req: express.Request, res: express.Response) => {
  return res.sendStatus(501);
});

// @route   POST /v1/user/
// @desc    Create new user
// @access  Public
// @response codes  201, 400
router.post("/", controller.createUser);

export default router;

import * as express from "express";
import { check } from "express-validator";
import UserController from "../controllers/UserController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import StatsDMiddleware from "../middlewares/StatsDMiddleware";

const router = express.Router();
const controller = new UserController();

// @route   GET /v1/user/
// @desc    NOT IMPLEMENTED
// @access  Private
// router.get("/", (req: express.Request, res: express.Response) => {
//   return res.sendStatus(501);
// });

// @route   POST /v1/user/
// @desc    Create new user
// @access  Public
// @response codes  201, 400
router.post(
  "/",
  StatsDMiddleware,
  check("first_name", "first_name is a required field").not().isEmpty(),
  check("last_name", "last_name is a required field").not().isEmpty(),
  check("username", "username should be a valid email address").isEmail(),
  check("password", "password is a required field").not().isEmpty(),
  check("password", "password needs to be 6 characters or longer").isLength({ min: 6 }),
  controller.checkValidationErrors,
  controller.createUser
);

// @route   GET /v1/user/:userId
// @desc    Get User details
// @access  Private
// @response codes  200, 401, 403
router.get("/:userId", AuthMiddleware, controller.getUserProfile);

// @route   PUT /v1/user/:userId
// @desc    Update User details
// @access  Private
// @response codes  204, 400, 401, 403
router.put(
  "/:userId",
  AuthMiddleware,
  check("first_name", "first_name is a required field").not().isEmpty(),
  check("last_name", "last_name is a required field").not().isEmpty(),
  check("username", "username should be a valid email address").isEmail(),
  check("password", "password is a required field").not().isEmpty(),
  check("password", "password needs to be 6 characters or longer").isLength({ min: 6 }),
  controller.checkValidationErrors,
  controller.updateUser
);

export default router;

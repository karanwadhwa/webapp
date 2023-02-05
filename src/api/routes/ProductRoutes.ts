import * as express from "express";
import { check } from "express-validator";
import ProductController from "../controllers/ProductController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();
const controller = new ProductController();

// @route   POST /v1/product/
// @desc    Create new product
// @access  Private
// @response codes  201, 400
router.post(
  "/",
  AuthMiddleware,
  check("quantity", "Enter a valid quantity value between 0 and 100").isInt({ min: 0, max: 100 }),
  controller.checkValidationErrors,
  controller.createProduct
);

// @route   GET /v1/product/:productId
// @desc    Get product details
// @access  Public
// @response codes  200, 404
router.get("/:productId", controller.getProduct);

export default router;

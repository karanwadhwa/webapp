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

// @route   PUT /v1/product/:productId
// @desc    Update product
// @access  Private
// @response codes  204, 400, 401, 403
router.put(
  "/:productId",
  AuthMiddleware,
  check("productId", "Enter a valid product id").not().isEmpty(),
  check("quantity", "Enter a valid quantity value between 0 and 100").isInt({ min: 0, max: 100 }),
  controller.checkValidationErrors,
  controller.updateProduct
);

// @route   PATCH /v1/product/:productId
// @desc    Update product
// @access  Private
// @response codes  204, 400, 401, 403
router.patch(
  "/:productId",
  AuthMiddleware,
  check("productId", "Enter a valid product id").not().isEmpty(),
  check("quantity", "Enter a valid quantity value between 0 and 100").isInt({ min: 0, max: 100 }),
  controller.checkValidationErrors,
  controller.updateProduct
);

// @route   DELETE /v1/product/:productId
// @desc    Delete product
// @access  Private
// @response codes  204, 400, 401, 403, 404
router.delete(
  "/:productId",
  AuthMiddleware,
  check("productId", "Enter a valid product id").not().isEmpty(),
  controller.checkValidationErrors,
  controller.deleteProduct
);

export default router;

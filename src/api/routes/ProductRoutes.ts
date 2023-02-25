import * as express from "express";
import multer from "multer";
import { check } from "express-validator";
import ProductController from "../controllers/ProductController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();
const controller = new ProductController();
const upload = multer({ dest: "uploads/" });

// @route   POST /v1/product/
// @desc    Create new product
// @access  Private
// @response codes  201, 400
router.post(
  "/",
  AuthMiddleware,
  check("name", "name is a required field").not().isEmpty(),
  check("description", "description is a required field").not().isEmpty(),
  check("sku", "sku is a required field").not().isEmpty(),
  check("manufacturer", "manufacturer is a required field").not().isEmpty(),
  check("quantity", "Enter a valid quantity value between 0 and 100").isInt({
    min: 0,
    max: 100,
  }),
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
  check("name", "name is a required field").not().isEmpty(),
  check("description", "description is a required field").not().isEmpty(),
  check("sku", "sku is a required field").not().isEmpty(),
  check("manufacturer", "manufacturer is a required field").not().isEmpty(),
  check("productId", "Enter a valid product id").not().isEmpty(),
  check("quantity", "Enter a valid quantity value between 0 and 100").isInt({
    min: 0,
    max: 100,
  }),
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

// @route   POST /v1/product/{productId}/image
// @desc    Upload an image
// @access  Private
// @response codes  201, 400, 401
router.post(
  "/:productId/image",
  AuthMiddleware,
  upload.single("file"),
  controller.addProductImage
);

// @route   GET /v1/product/{productId}/image
// @desc    Get a list of all uploaded images for the specified product
// @access  Private
// @response codes  200, 401, 403
router.get("/:productId/image");

// @route   GET /v1/product/{productId}/image/{imageId}
// @desc    Get Image details
// @access  Private
// @response codes  200, 401, 403
router.get("/:productId/image/:imageId");

// @route   DELETE /v1/product/{productId}/image/{imageId}
// @desc    Hard Delete an image
// @access  Private
// @response codes  200, 401, 404
router.delete("/:productId/image/:imageId");

export default router;

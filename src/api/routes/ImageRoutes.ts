import express from "express";
import ImageController from "../controllers/ImageController";

const router = express.Router();
const controller = new ImageController();

// @route   GET /v1/product/{productId}/image
// @desc    Get a list of all uploaded images for the specified product
// @access  Private
// @response codes  200, 401, 403
router.get("/");

// @route   POST /v1/product/{productId}/image
// @desc    Upload an image
// @access  Private
// @response codes  201, 400, 401
router.post("/");

// @route   GET /v1/product/{productId}/image/{imageId}
// @desc    Get Image details
// @access  Private
// @response codes  200, 401, 403
router.get("/:imageId");

// @route   DELETE /v1/product/{productId}/image/{imageId}
// @desc    Hard Delete an image
// @access  Private
// @response codes  200, 401, 404
router.delete("/:imageId");

export default router;

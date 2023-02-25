import express from "express";

import { RequestUserAuth } from "../middlewares/AuthMiddleware";
import ProductService from "../services/ProductService";
import UserService from "../services/UserService";
import RootController from "./RootController";

const userService = new UserService();
const productService = new ProductService();

class ProductController extends RootController {
  constructor() {
    super();
  }

  getProduct = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const product = await productService.findById(parseInt(req.params.productId));
    if (product) return res.status(200).json({ ...product.toJSON() });

    return res.sendStatus(404);
  };

  createProduct = async (
    req: RequestUserAuth,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const user = await userService.findById(req.user.id);
      let existing = await productService.findBySKU(req.body.sku);
      if (existing) return res.status(400).json({ error: "SKU must be unique" });

      if (req.body.quantity && typeof req.body.quantity !== "number")
        return res
          .status(400)
          .json({ error: "Quantity must be an integer value between 0 and 100" });

      const product = await productService.create(user, req.body);

      return res.status(201).json({ ...product.toJSON() });
    } catch (error) {
      console.log(error);
      if (error.errors) return res.status(400).json({ errors: error.errors });
      else return res.sendStatus(400);
    }
  };

  updateProduct = async (
    req: RequestUserAuth,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      if (req.body.quantity && typeof req.body.quantity !== "number")
        return res
          .status(400)
          .json({ error: "Quantity must be an integer value between 0 and 100" });

      const productId = parseInt(req.params.productId);
      const product = await productService.findById(productId);
      if (!product) return res.sendStatus(404);
      if (product.owner_user_id !== req.user.id)
        return res.status(403).json({ error: "You do not have access to this data" });

      let existing = null;
      if (req.body.sku) existing = await productService.findBySKU(req.body.sku);
      if (!!existing) {
        let currentProd = await productService.findById(productId);
        currentProd = currentProd.toJSON();
        existing = existing.toJSON();
        if (existing.id !== currentProd.id)
          return res
            .status(400)
            .json({ error: `A product with SKU: '${req.body.sku}' already exists.` });
      }

      const updated = await productService.update(req.body, productId);
      console.log(updated);
      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      if (error.errors) return res.status(400).json({ errors: error.errors });
      else return res.sendStatus(400);
    }
  };

  deleteProduct = async (
    req: RequestUserAuth,
    res: express.Response
  ): Promise<express.Response> => {
    const productId = parseInt(req.params.productId);
    const product = await productService.findById(productId);
    if (!product) return res.sendStatus(404);
    if (product.owner_user_id !== req.user.id)
      return res.status(403).json({ error: "You do not have access to this data" });

    const deleted = await productService.delete(productId);
    console.log(deleted);
    return res.sendStatus(204);
  };

  addProductImage = async (req, res: express.Response): Promise<express.Response> => {
    try {
      const file = req.file;
      const productId = parseInt(req.params.productId);
      const product = await productService.findById(productId);
      if (!product) return res.status(404).json({ error: "Invalid product id" });
      if (product.get("owner_user_id") !== req.user.id)
        return res.status(403).json({ error: "You do not have access to this data" });

      const imageData = await productService.saveImageData(productId, {
        file_name: file.originalname,
        s3_bucket_path: file.path,
      });

      return res.status(201).json({ ...imageData.toJSON() });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ err });
    }
  };
}

export default ProductController;

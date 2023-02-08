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

  getProduct = async (req: express.Request, res: express.Response): Promise<express.Response> => {
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
      const productId = parseInt(req.params.productId);
      const product = await productService.findById(productId);
      if (!product) return res.sendStatus(404);
      if (product.owner_user_id !== req.user.id)
        return res.status(403).json({ error: "You do not have access to this data" });

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
}

export default ProductController;

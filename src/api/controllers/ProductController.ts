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

  createProduct = async (
    req: RequestUserAuth,
    res: express.Response
  ): Promise<express.Response> => {
    const user = await userService.findById(req.user.id);
    const product = await productService.create(user, req.body);

    return res.status(201).json({ ...product.toJSON() });
  };

  getProduct = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const product = await productService.findById(parseInt(req.params.productId));
    if (product) return res.status(200).json({ ...product.toJSON() });

    return res.sendStatus(404);
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

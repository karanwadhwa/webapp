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
}

export default ProductController;

import ProductModel from "../models/ProductModel";
import UserModel from "../models/UserModel";

interface ProductParams {
  name?: string;
  description?: string;
  sku?: string;
  manufacturer?: string;
  quantity: number;
}

class ProductService {
  constructor() {}

  findById = async (id: number) => {
    return await ProductModel.findByPk(id);
  };

  create = async (user: UserModel, params: ProductParams) => {
    const { name, description, sku, manufacturer, quantity } = params;

    const product = user.createProduct({ name, description, sku, manufacturer, quantity });
    return product;
  };

  delete = async (id: number) => {
    return await ProductModel.destroy({ where: { id } });
  };
}

export default ProductService;

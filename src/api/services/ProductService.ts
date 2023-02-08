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

  findBySKU = async (sku: string) => {
    return await ProductModel.findOne({ where: { sku } });
  };

  create = async (user: UserModel, params: ProductParams) => {
    try {
      const { name, description, sku, manufacturer, quantity } = params;

      const product = user.createProduct({ name, description, sku, manufacturer, quantity });
      return product;
    } catch (error) {
      throw error;
    }
  };

  update = async (params: ProductParams, id: number) => {
    const { name, description, sku, manufacturer, quantity } = params;

    const product = await ProductModel.update(
      { name, description, sku, manufacturer, quantity },
      { where: { id } }
    );

    return product;
  };

  delete = async (id: number) => {
    return await ProductModel.destroy({ where: { id } });
  };
}

export default ProductService;

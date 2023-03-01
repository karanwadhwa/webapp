import ImageModel from "../models/ImageModel";
import ProductModel from "../models/ProductModel";
import UserModel from "../models/UserModel";

interface ProductParams {
  name: string;
  description: string;
  sku: string;
  manufacturer: string;
  quantity: number;
}

interface ImageParams {
  file_name: string;
  s3_bucket_path: string;
}

class ProductService {
  constructor() {}

  findById = async (id: number): Promise<ProductModel> => {
    return await ProductModel.findByPk(id);
  };

  findBySKU = async (sku: string): Promise<ProductModel> => {
    return await ProductModel.findOne({ where: { sku } });
  };

  create = async (user: UserModel, params: ProductParams): Promise<ProductModel> => {
    try {
      const { name, description, sku, manufacturer, quantity } = params;

      const product = user.createProduct({
        name,
        description,
        sku,
        manufacturer,
        quantity,
      });
      return product;
    } catch (error) {
      throw error;
    }
  };

  update = async (params: ProductParams, id: number): Promise<[number]> => {
    const { name, description, sku, manufacturer, quantity } = params;

    const affectedCount = await ProductModel.update(
      { name, description, sku, manufacturer, quantity },
      { where: { id } }
    );

    return affectedCount;
  };

  delete = async (id: number): Promise<number> => {
    const affectedCount = await ProductModel.destroy({ where: { id } });
    const deletedImages = await ImageModel.destroy({ where: { product_id: id } });
    return affectedCount;
  };

  saveImageData = async (
    product: ProductModel,
    params: ImageParams
  ): Promise<ImageModel> => {
    try {
      return product.createImage({ ...params });
    } catch (err) {
      throw err;
    }
  };

  findImageById = async (id: number): Promise<ImageModel> => {
    return ImageModel.findByPk(id);
  };

  deleteImage = async (image_id: number): Promise<number> => {
    try {
      return await ImageModel.destroy({ where: { image_id } });
    } catch (err) {
      throw err;
    }
  };
}

export default ProductService;

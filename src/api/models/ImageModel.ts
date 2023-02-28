import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import ProductModel from "./ProductModel";

export default class ImageModel extends Model<
  InferAttributes<ImageModel>,
  InferCreationAttributes<ImageModel>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare image_id: CreationOptional<number>;

  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
  // display an error if ownerId is missing.
  declare product_id: ForeignKey<ProductModel["id"]>;

  declare file_name: string;
  declare s3_bucket_path: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare date_created: CreationOptional<Date>;
}

export const attributes = {
  image_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  file_name: { type: DataTypes.STRING, allowNull: false },
  s3_bucket_path: { type: DataTypes.STRING, allowNull: false },
  date_created: DataTypes.DATE,
};

export const options = {
  tableName: "product_images",
  timestamps: true,
  createdAt: "date_created",
  updatedAt: false,
};

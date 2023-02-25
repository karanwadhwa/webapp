import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import ImageModel from "./ImageModel";
import UserModel from "./UserModel";

export default class ProductModel extends Model<
  InferAttributes<ProductModel, { omit: "images" }>,
  InferCreationAttributes<ProductModel, { omit: "images" }>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;

  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
  // display an error if ownerId is missing.
  declare owner_user_id: ForeignKey<UserModel["id"]>;

  declare name: string;
  declare description: string;
  declare sku: string;
  declare manufacturer: string;
  declare quantity: number;

  // timestamps!
  // createdAt can be undefined during creation
  declare date_added: CreationOptional<Date>;
  declare date_last_updated: CreationOptional<Date>;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getImages: HasManyGetAssociationsMixin<ImageModel>; // Note the null assertions!
  declare addImage: HasManyAddAssociationMixin<ImageModel, number>;
  declare addImages: HasManyAddAssociationsMixin<ImageModel, number>;
  declare setImages: HasManySetAssociationsMixin<ImageModel, number>;
  declare removeImage: HasManyRemoveAssociationMixin<ImageModel, number>;
  declare removeImages: HasManyRemoveAssociationsMixin<ImageModel, number>;
  declare hasImage: HasManyHasAssociationMixin<ImageModel, number>;
  declare hasImages: HasManyHasAssociationsMixin<ImageModel, number>;
  declare countImages: HasManyCountAssociationsMixin;
  declare createImage: HasManyCreateAssociationMixin<ImageModel, "product_id">;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare images?: NonAttribute<ImageModel[]>; // Note this is optional since it's only populated when explicitly requested in code
}

export const attributes = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  sku: { type: DataTypes.STRING, allowNull: false, unique: true },
  manufacturer: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  date_added: DataTypes.DATE,
  date_last_updated: DataTypes.DATE,
};

export const options = {
  tableName: "products",
  timestamps: true,
  createdAt: "date_added",
  updatedAt: "date_last_updated",
};

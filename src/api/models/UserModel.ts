import {
  CreationOptional,
  DataTypes,
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
import ProductModel from "./ProductModel";

export default class UserModel extends Model<
  InferAttributes<UserModel, { omit: "products" }>,
  InferCreationAttributes<UserModel, { omit: "products" }>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare first_name: string;
  declare last_name: string;
  // timestamps!
  // createdAt can be undefined during creation
  declare account_created: CreationOptional<Date>;
  declare account_updated: CreationOptional<Date>;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getProducts: HasManyGetAssociationsMixin<ProductModel>; // Note the null assertions!
  declare addProduct: HasManyAddAssociationMixin<ProductModel, number>;
  declare addProducts: HasManyAddAssociationsMixin<ProductModel, number>;
  declare setProducts: HasManySetAssociationsMixin<ProductModel, number>;
  declare removeProduct: HasManyRemoveAssociationMixin<ProductModel, number>;
  declare removeProducts: HasManyRemoveAssociationsMixin<ProductModel, number>;
  declare hasProduct: HasManyHasAssociationMixin<ProductModel, number>;
  declare hasProducts: HasManyHasAssociationsMixin<ProductModel, number>;
  declare countProducts: HasManyCountAssociationsMixin;
  declare createProduct: HasManyCreateAssociationMixin<ProductModel, "owner_user_id">;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare products?: NonAttribute<ProductModel[]>; // Note this is optional since it's only populated when explicitly requested in code
}

export const attributes = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  account_created: DataTypes.DATE,
  account_updated: DataTypes.DATE,
};

export const options = {
  tableName: "users",
  timestamps: true,
  createdAt: "account_created",
  updatedAt: "account_updated",
  // https://sequelize.org/docs/v6/other-topics/scopes/
  defaultScope: {
    // exclude passwords by default
    attributes: { exclude: ["password"] },
  },
  // scopes: {
  //   // include password with this scope
  //   // USAGE: await User.scope("includeEverything").findAll();
  //   includeEverything: { attributes: {} },
  // },
};

import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import UserModel from "./UserModel";

export default class ProductModel extends Model<
  InferAttributes<ProductModel>,
  InferCreationAttributes<ProductModel>
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
}

export const attributes = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, defaultValue: null },
  description: { type: DataTypes.STRING, defaultValue: null },
  sku: { type: DataTypes.STRING, defaultValue: null },
  manufacturer: { type: DataTypes.STRING, defaultValue: null },
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

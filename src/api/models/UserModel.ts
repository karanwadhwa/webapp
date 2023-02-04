import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export default class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
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

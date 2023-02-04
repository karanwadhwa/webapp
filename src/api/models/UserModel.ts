import { DataTypes } from "sequelize";

export default function model(sequelize) {
  const attributes = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    tableName: "users",
    timestamps: true,
    createdAt: "account_created",
    updatedAt: "account_updated",
    // https://sequelize.org/docs/v6/other-topics/scopes/
    defaultScope: {
      // exclude passwords by default
      attributes: { exclude: ["password"] },
    },
    scopes: {
      // include password with this scope
      // USAGE: await User.scope("includeEverything").findAll();
      includeEverything: { attributes: {} },
    },
  };

  return sequelize.define("User", attributes, options);
}

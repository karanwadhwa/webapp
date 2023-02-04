import { Sequelize } from "sequelize";
import mysql from "mysql2";
import dotenv from "dotenv";
import User from "./UserModel";
dotenv.config();

const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

interface dbInterface {
  User: (s: Sequelize) => Sequelize;
}

let db: dbInterface;

export async function initializeDatabase() {
  // Create Database if it doesnt already exist
  const connection = mysql.createConnection(dbConfig);
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\`;`, (err, result) => {
    if (err) throw err;
    console.log("database created", result);

    // initialize db connection with sequelize
    const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      dialect: "mysql",
    });

    db = {
      User: User(sequelize),
    };

    return sequelize.sync({ alter: true });
  });
}

export default db;

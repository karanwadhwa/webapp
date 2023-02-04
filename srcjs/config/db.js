require("dotenv").config();
const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
};

// Create DB Connection
const dbconn = mysql.createConnection(dbConfig);

// initialize database for project setup
const initDatabase = () => {
  const createTableQuery = `CREATE TABLE users(\
    id int AUTO_INCREMENT PRIMARY KEY, \
    username VARCHAR(255) NOT NULL UNIQUE, \
    first_name VARCHAR(255) NOT NULL, \
    last_name VARCHAR(255) NOT NULL, \
    password VARCHAR(255) NOT NULL, \
    account_created DATETIME, \
    account_updated DATETIME)`;

  dbconn.query(createTableQuery, (err, result) => {
    if (err && err.code !== "ER_TABLE_EXISTS_ERROR") throw err;
    console.log(result);
  });
  dbconn.end();
};

exports.dbconn = dbconn;
exports.initDatabase = initDatabase;

const mysql = require("mysql2");

const DB_HOST = "localhost";
const DB_USER = "root";
const DB_PASSWORD = "root";
const DB_DATABASE = "webapp6225";

// Create DB Connection
const dbconn = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  multipleStatements: true,
});

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

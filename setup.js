const mysql = require("mysql2");

const DB_HOST = "";
const DB_USER = "";
const DB_PASSWORD = "";
const DB_DATABASE = "webapp6225";

// Create DB Connection
const dbconn = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

// initialize database for project setup
const initDatabase = () => {
  const createTableQuery =
    "CREATE TABLE users(id int AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255), password VARCHAR(255), account_created DATE, account_updated DATE)";

  dbconn.query(createTableQuery, (err, result) => {
    if (err && err.code !== "ER_TABLE_EXISTS_ERROR") throw err;
    console.log(result);
  });
  dbconn.end();
};

initDatabase();

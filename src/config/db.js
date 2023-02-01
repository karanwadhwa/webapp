require("dotenv").config();
const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
};

let dbconn;

async function handleDisconnect() {
  // Create DB Connection
  dbconn = await mysql.createConnection(dbConfig);

  dbconn.connect((err) => {
    if (err) {
      console.log("Error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  dbconn.on("error", (err) => {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") handleDisconnect();
    else throw err;
  });
}

handleDisconnect();

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

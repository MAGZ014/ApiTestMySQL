import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connectionString = DEFAULT_CONFIG;

let connection;

export const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection(connectionString);
  }
  return connection;
};

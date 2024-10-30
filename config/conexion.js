import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  password: process.env.DB_PASSWORD ?? "root",
  database: process.env.DB_DATABASE ?? "lobos_kit",
};

const connectionString = DEFAULT_CONFIG;

let connection;

export const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection(connectionString);
  }
  return connection;
};

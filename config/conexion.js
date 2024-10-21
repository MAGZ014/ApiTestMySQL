import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "root",
  database: "test",
};

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

let connection;

export const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection(connectionString);
  }
  return connection;
};

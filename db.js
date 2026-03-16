const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: "postgres",
  password: "23232323",
  host: "localhost",
  port: 5432,
  database: "todo_list",
});

module.exports = pool;

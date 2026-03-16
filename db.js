const { Pool } = require("pg");

const pool = new Pool({
  // Chỉ dùng connectionString, nó đã chứa đầy đủ user/pass/host/port/db rồi
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

const { Pool } = require('pg');

require('dotenv').config();
export const client = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWD,
  port: process.env.DB_PORT,
  ssl: true
})

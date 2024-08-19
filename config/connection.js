const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: 'postgres',
  password: process.env.MYSQL_PASSWORD,
  database: 'employee_db',
});

module.exports = connection;

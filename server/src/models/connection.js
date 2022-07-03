const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
  host: 'dataDb',
  user: 'root',
  password: 'docker',
  database: 'blitz_carreira',
});

module.exports = connection;

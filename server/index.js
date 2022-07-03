const express = require('express');
const connection = require('./src/models/connection');

const app = express();

app.get('/', async (req, res) => {
  const result = await connection.execute('SELECT * from task');
  res.status(200).json(result);
});

app.listen(process.env.PORT);

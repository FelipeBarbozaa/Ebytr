const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./src/models/connection');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
  const [result] = await connection.execute('SELECT * from task');
  res.status(200).json(result);
});

app.post('/', async (req, res) => {
  const { name } = req.body;
  await connection.execute('INSERT INTO task (name, status) VALUES (?, ?)', [name, 0]);
  res.status(200).end();
});

app.listen(process.env.PORT);

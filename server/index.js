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
  await connection.execute('INSERT INTO task (name, status, createdAt) VALUES (?, ?, ?)', [name, 0, new Date()]);
  res.status(200).end();
});

app.delete('/', async (req, res) => {
  const { id } = req.body;
  await connection.execute('DELETE FROM task where id = ?', [id]);
  res.status(204).end();
});

app.put('/', async (req, res) => {
  const { status, id } = req.body;
  const table = {
    pendente: 0,
    'em andamento': 1,
    concluido: 2,
  };
  await connection.execute('UPDATE task SET status = ? WHERE id = ?', [table[status], id]);
  res.status(200).end();
});

app.put('/name', async (req, res) => {
  const { name, id } = req.body;
  await connection.execute('UPDATE task SET name = ? WHERE id = ?', [name, id]);
  res.status(204).end();
});

app.listen(process.env.PORT);

var express = require('express');
var app = express();
const { Client } = require('pg');
app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.get('/', async (req, res) => {
  const client = new Client({
    host: 'localhost',
    user: 'mgalush',
    database: 'todoApp',
  });
  try {
    await client.connect();
    const resFromDB = await client.query('SELECT * FROM public.todos');
    res.send(resFromDB.rows);
    await client.end();
  } catch (error) {
    console.error(error);
  }
});

app.post('/', async (req, res) => {
  const client = new Client({
    host: 'localhost',
    user: 'mgalush',
    database: 'todoApp',
  });
  try {
    await client.connect();
    const resFromDB = await client.query(
      `INSERT INTO public.todos (name) VALUES ($1::text) returning *`, [req.body.name]
    );
    res.send(resFromDB.rows[0]);
    await client.end();
  } catch (error) {
    console.error(error);
  }
});

app.delete('/:id', async (req, res) => {
  const client = new Client({
    host: 'localhost',
    user: 'mgalush',
    database: 'todoApp',
  });
  try {
    await client.connect();
    const resFromDB = await client.query(
      'DELETE FROM public.todos WHERE id=$1', [req.params.id]
    );
    res.send(resFromDB.rows);
    await client.end();
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000);

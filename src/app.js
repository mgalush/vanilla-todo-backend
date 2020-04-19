var express = require('express');
var app = express();
const { Client } = require('pg')

app.get('/', async (req, res) => {
  const client = new Client({
    host: "localhost",
    user: "mgalush",
    database: "todoApp",
  });
  try {
    await client.connect()
    const resFromDB = await client.query('SELECT * FROM public.todos');
    res.header('Access-Control-Allow-Origin', '*');
    res.send(resFromDB.rows)
    await client.end()
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000);
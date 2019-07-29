const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json('hola maría');
});

app.get('/hola', (req, res) => {
  res.json('maría');
});

app.listen(3000, () => {
  console.log('Express listening on port 3000');
});

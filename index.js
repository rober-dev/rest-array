// Libs references
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Database
let movies = require('./data/movies.json');

// Rest methods
app.get('/', (req, res) => {
  res.json('hola maría');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find(m => m.id === id);
  movie
    ? res.json(movie)
    : res.status(404).json('Movie with id ' + id + ' does not exist');
});

app.get('/movies/search/:filter', (req, res) => {
  const filter = req.params.filter;
  const result = movies.find(
    m => m.name.toUpperCase() === filter.toUpperCase()
  );
  res.json(result);
});

app.post('/movies', (req, res) => {
  const movieName = req.body.name;
  const movieId = movies[movies.length - 1].id + 1;
  const movie = {
    id: movieId,
    name: movieName
  };
  movies.push(movie);
  res.json(movie);
});

app.put('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.body.name;

  const movie = movies.find(m => m.id === id);
  if (!movie) {
    res.status(404).json('Movie with id ' + id + ' does not exist');
  } else {
    movie.name = name;
    res.json(movie);
  }
});

app.delete('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find(m => m.id === id);
  if (!movie) {
    res.status(404).json('Movie with id ' + id + ' does not exist');
  } else {
    movies = movies.filter(m => {
      return m.id !== id;
    });
    res.json(movies);
  }
});

app.use('*', (req, res) => {
  res.status(404).json('Method does not exist');
});

// Server start
app.listen(3000, () => {
  console.log('Express listening on port 3000');
});

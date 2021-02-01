const express = require('express')
const app = express()
const port = 3001
const host = "192.168.1.51"

const db = require('./db')

app.use(express.json())


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});


app.get('/getMovies', (req, res) => {
    console.log("entro");
    db.getMovies()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})




app.get('/getUpcomingMovies', (req, res) => {
  console.log("entro");
  db.getUpcomingMovies()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/getTopRatedMovies', (req, res) => {
  console.log("entro");
  db.getTopRatedMovies()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/getLatestMovies', (req, res) => {
  console.log("entro");
  db.getLatestMovies()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/getMovieId', (req, res) => {
  db.getMovieById(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
}) 


app.listen(port, () => {
    console.log(`App running on port ${port}. host ${host}`)
})
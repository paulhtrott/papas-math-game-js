require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Set up express to process routes.
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/games/sequence', function (request, response) {
  console.log(process.env);
  // Set json response header.
  response.setHeader('Content-Type', 'application/json');

  console.log('API_KEY', process.env.REACT_APP_API_KEY);

  // Return game details.
  return response.status(200).send(JSON.stringify({
    game: {
      numbers: [3, 5, 6],
      randoms: [1, 2, 3]
    }
  }));
});

// Get the index page.
app.get('/*', function (request, response) {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);

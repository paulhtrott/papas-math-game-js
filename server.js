'use strict';

require('dotenv').config();
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const Sequence = require('./server/sequence');

// Set up express to process routes.
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sequence game endpoint.
app.get('/api/v1/games/sequence', function (request, response) {
  // TODO: Kill unless api key is provided.

  // TODO: This will be part of request details later.
  const randomNumbers = [
    _.random(1, 25, false),
    _.random(1, 25, false),
    _.random(1, 25, false),
    _.random(1, 25, false),
    _.random(1, 25, false)
  ];

  const sequence = new Sequence(randomNumbers);

  sequence.calculateSequence();

  // Set json response header.
  response.setHeader('Content-Type', 'application/json');

  // Return game details.
  return response.status(200).send(JSON.stringify(sequence.results));
});

// Get the index page.
app.get('/*', function (request, response) {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 50001);

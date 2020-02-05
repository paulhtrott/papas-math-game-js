'use strict';

const Game = require('./game');

const _ = require('lodash');

class Sequence extends Game {
  // Instantiate a Sequence game.
  constructor(randomNumbers = [], operation = 'addition') {
    super(randomNumbers, operation);
    this.answers = [];
  }

  // Calculate the answers.
  calculateSequence() {
    // Generate the game values.
    this.calculateGameValues();

    // Sort the answers.
    this.calculatedAnswers = _.sortBy(this.calculatedAnswers);

    // Unique the answers.
    this.calculatedAnswers = _.sortedUniq(this.calculatedAnswers);

    // All sequence answers.
    this.fullCollection = [];

    // Answers for each sequence.
    this.collectionOfAnswers = [];

    // Generate the sequences.
    _.forEach(this.calculatedAnswers, (number) => {
      if (this.collectionOfAnswers.length === 0) {
        this.collectionOfAnswers.push(number);
      } else if (this.collectionOfAnswers[this.collectionOfAnswers.length - 1] + 1 === number) {
        this.collectionOfAnswers.push(number);

        // Close the collection when number is the final in the answers.
        if (number === _.last(this.calculatedAnswers)) {
          this.fullCollection.push(this.collectionOfAnswers);
        }
      } else {
        this.fullCollection.push(this.collectionOfAnswers);

        this.collectionOfAnswers = [];

        this.collectionOfAnswers.push(number);

        // Close the collection when number is the final in the answers.
        if (number === _.last(this.calculatedAnswers)) {
          this.fullCollection.push(this.collectionOfAnswers);
        }
      }
    });

    // Size of biggest array.
    const maxSize = _.maxBy(this.fullCollection, _.size).length

    // Gather the longest sequences.
    _.forEach(this.fullCollection, (collection) => {
      // Answers are all the sequences that are the max length.
      if (collection.length === maxSize) {
        this.answers.push(collection);
      }
    });

    this.results = _.merge(this.results, {
      answers: this.answers,
      fullCollectionOfAnswers: this.fullCollection
    });
  }
}

module.exports = Sequence;

'use strict';

const _ = require('lodash');

// Calculate the raults for a game.
class Game {
  constructor(randomNumbers = [], operation = 'addition') {
    this.randomNumbers = randomNumbers;
    this.operation = operation;
    this.operationSymbol = {
      addition: '+',
      multiplication: 'x'
    }[this.operation];
    this.howAnswersCalculated = [];
    this.calculatedAnswers = [];
  }

  // Method to calculate the game values.
  calculateGameValues() {
    // Calculate the numbers for the game.
    this.calculateValues([], 0, 0);

    // Sort the random numbers used.
    this.randomNumbers = _.sortBy(this.randomNumbers);

    // Sort the calculatedNumbers.
    this.calculatedAnswers = _.sortBy(this.calculatedAnswers);

    // Result collection of game values.
    this.results = {
      randomNumbers: this.randomNumbers,
      calculatedAnswers: this.calculatedAnswers,
      howAnswersCalculated: this.howAnswersCalculated
    };
  }

  // Caluculate the values for the game.
  calculateValues(currentCollection, index, accumulation) {
    // Range for random numbers.
    const range = _.range(index, this.randomNumbers.length);

    _.forEach(range, (i) => {
      // Temporary collection for calculating values.
      let temporaryCollection = [];

      // Fill temproray collection with currentCollection values.
      _.forEach(currentCollection, (value) => {
        temporaryCollection.push(value);
      });

      // Add the iterated random number to the temporary collection.
      temporaryCollection.push(this.randomNumbers[i]);

      // Recall the method.
      this.calculateValues(temporaryCollection, i + 1, accumulation + this.randomNumbers[i])
    });


    if (currentCollection.length > 1) {
      // Operation for message.
      const operator = ` ${this.operationSymbol} `;

      // Add the how answers were calculated.
      this.howAnswersCalculated.push(`${_.join(currentCollection, operator)} = ${accumulation}`)

      // Add the answer.
      this.calculatedAnswers.push(accumulation);
    }
  }
}

module.exports = Game;

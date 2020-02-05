const Sequence = require('../../server/sequence');

test('constructor initializes correctly with default values', () => {
  const sequence = new Sequence();

  expect(sequence.randomNumbers).toEqual([]);
  expect(sequence.operation).toEqual('addition');
  expect(sequence.operationSymbol).toEqual('+');
  expect(sequence.howAnswersCalculated).toEqual([]);
  expect(sequence.calculatedAnswers).toEqual([]);
});

test('calculateValues results are correct', () => {
  const sequence = new Sequence([3,5,11,12]);

  sequence.calculateSequence();

  expect(sequence.results).toEqual({
    randomNumbers: [ 3, 5, 11, 12 ],
    calculatedAnswers: [ 8, 14, 15, 16, 17, 19, 20, 23, 26, 28, 31 ],
    howAnswersCalculated: [
      '3 + 5 + 11 + 12 = 31',
      '3 + 5 + 11 = 19',
      '3 + 5 + 12 = 20',
      '3 + 5 = 8',
      '3 + 11 + 12 = 26',
      '3 + 11 = 14',
      '3 + 12 = 15',
      '5 + 11 + 12 = 28',
      '5 + 11 = 16',
      '5 + 12 = 17',
      '11 + 12 = 23'
    ],
    answers: [
      [ 14, 15, 16, 17 ]
    ],
    fullCollectionOfAnswers: [
      [ 8 ],
      [ 14, 15, 16, 17 ],
      [ 19, 20 ],
      [ 23 ],
      [ 26 ],
      [ 28 ],
      [ 31 ]
    ]
  });
});

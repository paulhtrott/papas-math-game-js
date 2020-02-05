const Game = require('../../server/game');

test('constructor initializes correctly with default values', () => {
  const game = new Game();

  expect(game.randomNumbers).toEqual([]);
  expect(game.operation).toEqual('addition');
  expect(game.operationSymbol).toEqual('+');
  expect(game.howAnswersCalculated).toEqual([]);
  expect(game.calculatedAnswers).toEqual([]);
});

test('constructor sets attributes correctly, addition', () => {
  const game = new Game([1,2,3], 'addition');

  expect(game.randomNumbers).toEqual([1,2,3]);
  expect(game.operation).toEqual('addition');
  expect(game.operationSymbol).toEqual('+');
});

test('constructor sets attributes correctly, multiplication', () => {
  const game = new Game([3,4,7], 'multiplication');

  expect(game.randomNumbers).toEqual([3,4,7]);
  expect(game.operation).toEqual('multiplication');
  expect(game.operationSymbol).toEqual('x');
});

test('calculateGameValues orders the random numbers used', () => {
  const game = new Game([4,9,2]);

  expect(game.randomNumbers).toEqual([4,9,2]);
  expect(game.operation).toEqual('addition');
  expect(game.operationSymbol).toEqual('+');

  game.calculateGameValues();

  expect(game.randomNumbers).toEqual([2,4,9]);
});

test('calculateGameValues results are correct', () => {
  const game = new Game([3,1,2]);

  game.calculateGameValues();

  expect(game.results).toEqual({
    randomNumbers: [ 1, 2, 3 ],
    calculatedAnswers: [ 3, 4, 5, 6 ],
    howAnswersCalculated: [
      '3 + 1 + 2 = 6',
      '3 + 1 = 4',
      '3 + 2 = 5',
      '1 + 2 = 3'
    ]
  });
});

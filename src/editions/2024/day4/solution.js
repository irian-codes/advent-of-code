import {readProblemInputAsString} from '#utils/fileUtils.js';

const problemInput = readProblemInputAsString(import.meta.dirname);
const problemTestInput = readProblemInputAsString(
  import.meta.dirname,
  'test-inputs/input.txt'
);

function inputToMatrix(inputStr) {
  const split = inputStr.split(/\n/);

  const matrix = [];

  split.forEach((line) => {
    matrix.push(line.trim().split(''));
  });

  return matrix;
}

function part1() {
  const input = inputToMatrix(problemTestInput);

  // console.log(input);

  // POTENTIAL APPROACHES:
  // - 1: Finding the words directly doing BFS or DFS
  // - 2: Removing non related characters and then search

  // STEPS:
  // 1 - For each letter:
  // 1.1 - If it's not marked as valid or invalid, proceed
  // 1.2 - If it's an X or S, search all directions (except left) for the word. Mark all letters that form words.
  // 1.3 - If it's not, and is not marked as valid, it's automatically invalid.

  const directions = [
    //[0, -1], // Left
    [0, 1], // Right
    //[-1, 0], // Up
    [1, 0], // Down
    [1, 1], // Diagonal-right-down
    [1, -1], // Diagonal-left-down
    //[-1, 1], // Diagonal-right-up
    //[-1, -1], // Diagonal-left-up
  ];
  const targetWord = 'XMAS';
  const rTargetWord = 'SAMX';

  let foundWordsCount = 0;
  const validPositionsMap = new Set();

  input.forEach((row, rowI) => {
    row.forEach((val, colI) => {
      const currentPos = [rowI, colI];

      if (typeof input[rowI][colI] !== 'string') {
        return;
      }

      const _foundWordsCount = findWordsAmount(currentPos);

      foundWordsCount += _foundWordsCount;

      // Marking as invalid (0) position as we didn't found any word
      if (
        _foundWordsCount === 0 &&
        !validPositionsMap.has(currentPos.join(','))
      ) {
        input[rowI][colI] = 0;
      }

      console.log('heeey 🚀 ~ file: solution.js:23 ~ part1 ~ input: ', input);
    });
  });

  // console.log(
  // 'heeey 🚀 ~ file: solution.js:74 ~ row.forEach ~ validPositionsMap: ',
  // validPositionsMap
  // );

  return foundWordsCount;

  // HELPER FUNCTIONS

  function findWordsAmount(startPos) {
    const _validPositions = tryFindWord(startPos);

    if (_validPositions.join(',').includes('6,5')) {
      // console.log('heeey 🚀 ~ file: solution.js:87 _validPositions: ', {
      // _validPositions,
      // vals: _validPositions.map((p) => input[p[0]][p[1]]),
      // });
    }

    // Marking valid (1) positions as they form words
    _validPositions.forEach((pos) => validPositionsMap.add(pos.join(',')));

    return Math.floor(_validPositions.length / targetWord.length);
  }

  // TODO: Position 6,5 is counted as valid but it isn't

  function tryFindWord(
    pos,
    dir = [],
    savedPositions = [],
    validChars = 0,
    mode
  ) {
    if (validChars === targetWord.length) {
      return savedPositions;
    }

    const [row, col] = pos;

    if (input[row] == null || typeof input[row][col] !== 'string') {
      return [];
    }

    const val = input[row][col];

    if (validChars === 0 && mode == null) {
      if (val !== targetWord[validChars] && val !== rTargetWord[validChars]) {
        return [];
      }

      const dirPositions = directions.map((dir) => [
        pos[0] + dir[0],
        pos[1] + dir[1],
      ]);

      const validPositions = [];

      dirPositions.forEach((newPos, i) => {
        const positions = tryFindWord(
          newPos.slice(),
          directions[i],
          savedPositions.slice(),
          validChars + 1,
          val === targetWord[validChars] ? 'f' : 'b'
        );

        validPositions.push(...positions);
      });

      if (validPositions.length > 0) {
        validPositions.push(pos);
      }

      return validPositions;
    }

    const _targetWord = mode === 'f' ? targetWord : rTargetWord;

    if (val !== _targetWord[validChars]) {
      return [];
    }

    savedPositions.push(pos);
    const newPos = [pos[0] + dir[0], pos[1] + dir[1]];

    return tryFindWord(
      newPos.slice(),
      dir,
      savedPositions.slice(),
      validChars + 1,
      mode
    );
  }
}

function part2() {
  // My test cases
  // 6 reports are correct if we eliminate one number
  /*
  7 6 4 2 1 -> Safe
  1 2 7 8 9 -> Unsafe
  1 2 7 3 4 -> Safe (by removing second bad number to fix)
  9 7 6 2 1 -> Unsafe
  1 3 2 4 5 -> Safe (by removing first or second bad number to fix)
  1 3 2 3 5 -> Safe (by removing first bad number to fix)
  8 6 4 4 1 -> Safe (by removing first or second bad number to fix)
  1 3 6 7 9 -> Safe
  */
  // const input = inputToMatrix(
  //   readProblemInputAsString(
  //     import.meta.dirname,
  //     'test-inputs/my-test-input.txt'
  //   )
  // );
  // Reddit suggested test cases
  // const input = inputToMatrix(
  //   readProblemInputAsString(
  //     import.meta.dirname,
  //     'test-inputs/reddit-test-input.txt'
  //   )
  // );
  // const input = inputToMatrix(problemInput);
  // console.log(input);
}

console.log('Part 1 solution: ', part1());
console.log('Part 2 solution: ', part2());

import {readProblemInputAsString} from '#utils/fileUtils.js';

const problemInput = readProblemInputAsString(import.meta.dirname);

function inputToMatrix(inputStr) {
  const split = inputStr.split(/\n/);
  // console.log(split);

  const matrix = [];

  split.forEach((line) => {
    matrix.push(line.split(/\s+/));
  });

  return matrix;
}

function part1() {
  const input = inputToMatrix(problemInput);

  const MIN_DIFF = 1;
  const MAX_DIFF = 3;

  let solution = 0;

  input.forEach((report) => {
    let previousDiffSign;

    for (let i = 0; i < report.length - 1; i++) {
      const val = report[i];
      const nextVal = report[i + 1];
      const diff = val - nextVal;
      const diffSign = diff < 0 ? -1 : 1;

      if (Math.abs(diff) < MIN_DIFF || Math.abs(diff) > MAX_DIFF) {
        return;
      }

      if (previousDiffSign != null && diffSign !== previousDiffSign) {
        return;
      }

      previousDiffSign = diffSign;
    }

    solution++;
  });

  return solution;
}

function part2() {}

console.log('Part 1 solution: ', part1());
console.log('Part 2 solution: ', part2());

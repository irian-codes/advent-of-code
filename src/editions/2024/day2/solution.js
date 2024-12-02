import {readProblemInputAsString} from '#utils/fileUtils.js';

const problemInput = readProblemInputAsString(import.meta.dirname);

function inputToMatrix(inputStr) {
  const split = inputStr.split(/\n/);
  console.log(split);

  const matrix = [];

  split.forEach((line) => {
    matrix.push(line.split(/\s+/));
  });

  return matrix;
}

function part1() {
  const input = inputToMatrix(`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1 0
1 3 2 4 5 12
8 6 4 4 1
1 3 6 7 9`);

  const MIN_DIFF = 1;
  const MAX_DIFF = 3;

  let solution = 0;

  input.forEach((report) => {
    let initialDirection; // 'inc' | 'dec'

    for (let i = 0; i < report.length - 1; i++) {
      const val = report[i];
      const nextVal = report[i + 1];

      const dir = val > nextVal ? 'dec' : 'inc';

      if (initialDirection == null) {
        initialDirection = dir;
      } else {
        if (initialDirection !== dir) {
          return;
        }
      }

      if (
        Math.abs(val - nextVal) < MIN_DIFF ||
        Math.abs(val - nextVal) > MAX_DIFF
      ) {
        return;
      }
    }

    solution++;
  });

  return solution;
}

function part2() {}

console.log('Part 1 solution: ', part1());
console.log('Part 2 solution: ', part2());

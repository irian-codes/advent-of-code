import {readProblemInputAsString} from '#utils/fileUtils.js';

const problemInput = readProblemInputAsString(import.meta.dirname);

function inputToMatrix(inputStr) {
  const split = inputStr.split(/\n/);
  // console.log(split);

  const matrix = [];

  split.forEach((line) => {
    matrix.push(line.trim().split(/\s+/));
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

  const input = inputToMatrix(problemInput);

  // console.log(input);

  const MIN_DIFF = 1;
  const MAX_DIFF = 3;

  let solution = 0;

  input.forEach((report) => {
    const result1 = isReportValid(report);

    if (!result1.isValid) {
      // Removing both possible bad levels
      const result2 = isReportValid(report.toSpliced(result1.failureIndex, 1));
      const result3 = isReportValid(
        report.toSpliced(result1.failureIndex + 1, 1)
      );
      // Edge case where the report gets valid if we remove the first element
      const result4 = isReportValid(report.toSpliced(0, 1));

      if (!result2.isValid && !result3.isValid && !result4.isValid) {
        // console.log('invalid: ', {report, result1, result2, result3});

        return;
      }
    }

    solution++;
  });

  return solution;

  // HELPER FUNCTIONS

  function isReportValid(report) {
    let previousDiffSign;

    for (let i = 0; i < report.length - 1; i++) {
      const val = report[i];
      const nextVal = report[i + 1];

      if (!isComparisonValid(val, nextVal, previousDiffSign)) {
        return {
          isValid: false,
          failureIndex: i,
        };
      }

      previousDiffSign = val - nextVal < 0 ? -1 : 1;
    }

    return {
      isValid: true,
    };
  }

  function isComparisonValid(val, nextVal, previousDiffSign) {
    if (val == null || nextVal == null) {
      return false;
    }

    const diff = val - nextVal;
    const diffSign = diff < 0 ? -1 : 1;

    if (Math.abs(diff) < MIN_DIFF || Math.abs(diff) > MAX_DIFF) {
      return false;
    }

    if (previousDiffSign != null && diffSign !== previousDiffSign) {
      return false;
    }

    return true;
  }
}

console.log('Part 1 solution: ', part1());
console.log('Part 2 solution: ', part2());

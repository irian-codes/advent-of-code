import {readProblemInputAsString} from '#utils/fileUtils.js';

const problemInput = readProblemInputAsString(import.meta.dirname);

function inputToArrays(inputStr) {
  const split = inputStr.split(/\s+/);
  // console.log(split);

  const list1 = [];
  const list2 = [];
  let count = 1;

  for (let i = 0; i < split.length; i++) {
    if (count % 2) {
      list1.push(split[i]);
    } else {
      list2.push(split[i]);
    }

    count++;
  }

  return {
    list1,
    list2,
  };
}

function part1() {
  const {list1, list2} = inputToArrays(problemInput);

  list1.sort();
  list2.sort();

  const solution = list1.reduce(
    (acc, val, i) => acc + Math.abs(val - list2[i]),
    0
  );

  return solution;
}

function part2() {
  const {list1, list2} = inputToArrays(problemInput);

  // console.log({list1, list2});

  const list2Map = (() => {
    const map = new Map();

    for (let i = 0; i < list2.length; i++) {
      const val = list2[i];

      if (map.has(val)) {
        map.set(val, map.get(val) + 1);
      } else {
        map.set(val, 1);
      }
    }

    return map;
  })();

  const solution = list1.reduce(
    (acc, val) => acc + val * (list2Map.get(val) ?? 0),
    0
  );

  return solution;
}

console.log('Part 1 solution: ', part1());
console.log('Part 2 solution: ', part2());

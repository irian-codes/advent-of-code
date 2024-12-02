import {readProblemInput} from '#utils/fileUtils.js';

const input = readProblemInput(import.meta.dirname);

const split = input.split(/\s+/);
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

list1.sort();
list2.sort();

const solution = list1.reduce(
  (acc, val, i) => acc + Math.abs(val - list2[i]),
  0
);

// console.log(solution);

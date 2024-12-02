import fs from 'node:fs';
import path from 'node:path';

export function readProblemInputAsString(
  fileFolderPath,
  inputFileName = 'input.txt'
) {
  return readFileSyncToString(path.join(fileFolderPath, inputFileName));
}

function readFileSyncToString(filePath) {
  return fs.readFileSync(filePath, {encoding: 'utf8'}).toString('utf8');
}

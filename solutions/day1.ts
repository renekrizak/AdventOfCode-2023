import { promises as fs } from "fs";

const filePath = "input.txt";

async function readLines(filepath: string): Promise<string[]> {
  try {
    const data = await fs.readFile(filepath, "utf8");
    const lines = data.split(/\r?\n/);
    return lines;
  } catch (error) {
    console.error("Error reading data: ", error);
    return [];
  }
}

function getSum(lines: string[]): number {
  let sum: number = 0;
  for (let i = 0; i < 1000; i++) {
    let str: string = lines[i];

    const leftNum = str.match(/\d/)?.[0];

    if (!leftNum) {
      return sum;
    }

    const rightNum = str.split("").reverse().join("").match(/\d/)?.[0];

    const concatDigits = leftNum + (rightNum || leftNum);

    const numToAdd = parseInt(concatDigits);

    sum += numToAdd;
  }
  console.log(sum);
  return sum;
}

readLines(filePath).then(getSum);

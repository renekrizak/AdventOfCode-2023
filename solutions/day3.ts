import { dir } from "console";
import * as fs from "fs";

const input = fs.readFileSync("test-input.txt", "utf-8");

function parseSchematic(input: string): (string | number)[][] {
  return input
    .split("\n")
    .map((line) =>
      line
        .split("")
        .map((char) => (isNaN(parseInt(char)) ? char : parseInt(char)))
    );
}

function isSymbol(char: any): boolean {
  return isNaN(char) && char !== ".";
}

const directions = [
  { dr: -1, dc: 0 }, //hore
  { dr: 1, dc: 0 }, //dole
  { dr: 0, dc: -1 }, //dolava
  { dr: 0, dc: 1 }, //doprava
  { dr: -1, dc: -1 }, //hore dolava
  { dr: -1, dc: 1 }, //hore doprava
  { dr: 1, dc: -1 }, //dole dolava
  { dr: 1, dc: 1 }, //dole doprava
];

function checkSymbolAdjacency(
  schema: (string | number)[][],
  nums: string,
  row: number,
  col: number
): boolean {
  let symbolFound = false;
  const sequenceLength = nums.length;
  for (let i = 0; i < sequenceLength; i++) {
    for (const { dr, dc } of directions) {
      const newRow = row + dr;
      const newCol = col + i + dc;

      if (
        newRow >= 0 &&
        newRow < schema.length &&
        newCol >= 0 &&
        newCol < schema[newRow].length
      ) {
        if (isSymbol(schema[newRow][newCol])) {
          symbolFound = true;
          break;
        }
      }
    }
  }

  return symbolFound;
}

function calculateSum(schema: (string | number)[][]): number {
  let sum = 0;
  const row = schema.length;
  const col = schema[0].length;
  let nums = "";
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (typeof schema[i][j] === "number") {
        nums += schema[i][j];
      }

      if (!(typeof schema[i][j + 1] === "number") && nums !== "") {
        if (checkSymbolAdjacency(schema, nums, i, j - (nums.length - 1))) {
          sum += parseInt(nums, 10);
        }

        nums = "";
      }
    }
  }
  return sum;
}

const schema = parseSchematic(input);
const sum = calculateSum(schema);
console.log(sum);

/**Part 2 not finished*/

function calculateGearRatioSum(schema: (string | number)[][]): number {
  let sum = 0;
  const row = schema.length;
  const col = schema[0].length;
  let nums = "";
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (typeof schema[i][j] === "number") {
        nums += schema[i][j];
      }

      if (!(typeof schema[i][j + 1] === "number") && nums !== "") {
        findStar(schema, nums, row, col - nums.length - 1);
      }
    }
  }
  return sum;
}

function findStar(
  schema: (string | number)[][],
  nums: string,
  row: number,
  col: number
): number {
  let starFound = false;
  const sequenceLength = nums.length;
  for (let i = 0; i < sequenceLength; i++) {
    for (const { dr, dc } of directions) {
      const newRow = row + dr;
      const newCol = col + i + dc;
      const prevRowDir = dr;
      const prevColDir = dc;

      if (
        newRow >= 0 &&
        newRow < schema.length &&
        newCol >= 0 &&
        newCol < schema[col].length
      ) {
        if (schema[newRow][newCol] === "*") {
        }
      }
    }
  }
  return 0;
}

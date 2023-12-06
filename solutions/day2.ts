import * as fs from "fs";

const RED_CUBES: number = 12;
const GREEN_CUBES: number = 13;
const BLUE_CUBES: number = 14;

/** Part-1 */
function isGamePossible(data: string): boolean {
  let modifiedInput = data.replace(/Game \d+:/, "").trim();
  const sets = modifiedInput.split(";").map((set) => set.trim());
  for (const set of sets) {
    const colors = set.split(",").map((set) => set.trim());
    for (const color of colors) {
      const [count, cubeColor] = color.split(" ").map((set) => set.trim());
      console.log(count, cubeColor);
      if (
        (cubeColor === "red" && parseInt(count, 10) > RED_CUBES) ||
        (cubeColor === "blue" && parseInt(count, 10) > BLUE_CUBES) ||
        (cubeColor === "green" && parseInt(count, 10) > GREEN_CUBES)
      )
        return false;
    }
  }
  return true;
}

function detPossibleGames(filename: string): number {
  const data = fs.readFileSync(filename, "utf-8");
  const lines = data.split("\n");
  let sum = 0;
  for (const [index, line] of lines.entries()) {
    if (isGamePossible(line)) {
      sum += index + 1;
    }
  }
  return sum;
}

const res = detPossibleGames("input.txt");
console.log(res);

/** Part 2 */
function lowestAmmount(data: string): number {
  let lowRed = 0;
  let lowBlue = 0;
  let lowGreen = 0;
  let modifiedInput = data.replace(/Game \d+:/, "").trim();
  const sets = modifiedInput.split(";").map((set) => set.trim());
  for (const set of sets) {
    const colors = set.split(",").map((set) => set.trim());
    for (const color of colors) {
      const [count, cubeColor] = color.split(" ").map((set) => set.trim());
      switch (cubeColor) {
        case "red":
          parseInt(count, 10) > lowRed
            ? (lowRed = parseInt(count, 10))
            : lowRed;
          break;
        case "green":
          parseInt(count, 10) > lowGreen
            ? (lowGreen = parseInt(count, 10))
            : lowGreen;
          break;
        case "blue":
          parseInt(count, 10) > lowBlue
            ? (lowBlue = parseInt(count, 10))
            : lowBlue;
          break;
      }
    }
  }
  return lowRed * lowGreen * lowBlue;
}

function getSum(filename: string): number {
  const data = fs.readFileSync(filename, "utf-8");
  const lines = data.split("\n");
  let sum = 0;
  for (const [index, line] of lines.entries()) {
    sum += lowestAmmount(line);
  }
  return sum;
}

const result = getSum("input.txt");
console.log(result);

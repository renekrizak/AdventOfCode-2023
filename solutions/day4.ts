import * as fs from "fs";

/**Part-1 poor solution */
function calculateWinningCardSum(filename: string): number {
  let sum = 0;
  let data = fs.readFileSync(filename, "utf-8");
  let lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    sum += cardSum(lines[i], i);
  }
  return sum;
}

function cardSum(data: string, cardNumber: number): number {
  let cardSum = 1;
  let elements = data.replace(/Card\s+\d+:/, "").trim();
  let [firstPartStr, secondPartStr] = elements.split("|");

  let gNum = firstPartStr.trim().split(" ").map(Number);
  let wNum = secondPartStr.trim().split(" ").map(Number);

  let count = 0;
  for (let i = 0; i < gNum.length; i++) {
    for (let j = 0; j < wNum.length; j++) {
      if (gNum[i] === wNum[j] && gNum[i] !== 0 && wNum[j] !== 0) {
        count++;
      }
    }
  }

  if (count === 0) {
    return 0;
  }
  for (let k = 0; k < count - 1; k++) {
    cardSum = cardSum * 2;
  }

  return cardSum;
}

const sum = calculateWinningCardSum("input.txt");
console.log(sum);

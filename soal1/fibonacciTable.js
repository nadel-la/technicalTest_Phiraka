/* 1. Define the order of the fibonacci*/
function generateFibonacciList(n) {
  let number1 = 0;
  let number2 = 1;
  let list = [];

  for (let i = 1; i <= n; i++) {
    list.push(number1);
    let nextNum = number1 + number2;
    number1 = number2;
    number2 = nextNum;
  }
  //   console.log(list, "<<");
  return list;
}

function fibonacciTable(rows, columns) {
  let fibonacciLists = generateFibonacciList(rows * columns);
  let output = "";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const index = i * columns + j;
      output += fibonacciLists[index] + " ";
    }
    output += "\n";
  }
  return output;
}

let rows = 2;
let columns = 10;
console.log(fibonacciTable(rows, columns));

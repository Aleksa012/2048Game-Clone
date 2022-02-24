const board = document.querySelector(".board");
const result = document.querySelector(".result");
const showHighscore = document.querySelector(".highscore");
const gameResult = document.querySelector(".game_result");

const width = 4;
let highscore = localStorage.getItem("highscore")
  ? localStorage.getItem("highscore")
  : 0;
showHighscore.textContent = highscore;
let score = 0;
let squares = [];

// Creating Board
function createBoard() {
  for (let i = 0; i < 16; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.textContent = 0;
    board.appendChild(square);
    squares.push(square);
  }
  addNumber();
  addNumber();
  changeColor();
}

createBoard();

// add Number

function addNumber() {
  let randomNum = Math.trunc(Math.random() * 16);
  if (squares[randomNum].textContent == 0) {
    squares[randomNum].textContent = 2;
  } else {
    addNumber();
  }
}

////// Moving squares

// Moving Left

function moveToLeft() {
  for (let i = 0; i < squares.length; i++) {
    if (i % 4 === 0) {
      const numOne = squares[i].textContent;
      const numTwo = squares[i + 1].textContent;
      const numThree = squares[i + 2].textContent;
      const numFour = squares[i + 3].textContent;

      const row = [+numOne, +numTwo, +numThree, +numFour];
      const rowFiltered = row.filter((num) => num);
      const empty = width - rowFiltered.length;
      const zeros = Array(empty).fill(0);
      const rowNew = rowFiltered.concat(zeros);

      squares[i].textContent = rowNew[0];
      squares[i + 1].textContent = rowNew[1];
      squares[i + 2].textContent = rowNew[2];
      squares[i + 3].textContent = rowNew[3];
    }
  }
}

// Moving Right

function moveToRight() {
  for (let i = 0; i < squares.length; i++) {
    if (i % 4 === 0) {
      const numOne = squares[i].textContent;
      const numTwo = squares[i + 1].textContent;
      const numThree = squares[i + 2].textContent;
      const numFour = squares[i + 3].textContent;

      const row = [+numOne, +numTwo, +numThree, +numFour];
      const rowFiltered = row.filter((num) => num);
      const empty = width - rowFiltered.length;
      const zeros = Array(empty).fill(0);
      const rowNew = zeros.concat(rowFiltered);

      squares[i].textContent = rowNew[0];
      squares[i + 1].textContent = rowNew[1];
      squares[i + 2].textContent = rowNew[2];
      squares[i + 3].textContent = rowNew[3];
    }
  }
}

// Moving Up

function moveUp() {
  for (let i = 0; i < width; i++) {
    const numOne = squares[i].textContent;
    const numTwo = squares[i + width].textContent;
    const numThree = squares[i + 2 * width].textContent;
    const numFour = squares[i + 3 * width].textContent;

    const column = [+numOne, +numTwo, +numThree, +numFour];
    const columnFiltered = column.filter((num) => num);
    const empty = width - columnFiltered.length;
    const zeros = Array(empty).fill(0);
    const columnNew = columnFiltered.concat(zeros);

    squares[i].textContent = columnNew[0];
    squares[i + width].textContent = columnNew[1];
    squares[i + 2 * width].textContent = columnNew[2];
    squares[i + 3 * width].textContent = columnNew[3];
  }
}

// Moving Down

function moveDown() {
  for (let i = 0; i < width; i++) {
    const numOne = squares[i].textContent;
    const numTwo = squares[i + width].textContent;
    const numThree = squares[i + 2 * width].textContent;
    const numFour = squares[i + 3 * width].textContent;

    const column = [+numOne, +numTwo, +numThree, +numFour];
    const columnFiltered = column.filter((num) => num);
    const empty = width - columnFiltered.length;
    const zeros = Array(empty).fill(0);
    const columnNew = zeros.concat(columnFiltered);

    squares[i].textContent = columnNew[0];
    squares[i + width].textContent = columnNew[1];
    squares[i + 2 * width].textContent = columnNew[2];
    squares[i + 3 * width].textContent = columnNew[3];
  }
}

////// Coliding

// rows

function colideRow() {
  for (let i = 0; i < 15; i++) {
    if (squares[i].textContent === squares[i + 1].textContent) {
      const colided = +squares[i].textContent + +squares[i + 1].textContent;
      squares[i].textContent = colided;
      squares[i + 1].textContent = 0;
      score += colided;
      result.textContent = score;
    }
  }
}

// columns

function colideColumn() {
  for (let i = 0; i < 12; i++) {
    if (squares[i].textContent === squares[i + width].textContent) {
      const colided = +squares[i].textContent + +squares[i + width].textContent;
      squares[i].textContent = colided;
      squares[i + width].textContent = 0;
      score += colided;
      result.textContent = score;
    }
  }
}

function move(e) {
  if (e.key === "ArrowUp") {
    moveUp();
    colideColumn();
    moveUp();
    addNumber();
    changeColor();
    gameWon();
    gameOver();
  } else if (e.key === "ArrowDown") {
    moveDown();
    colideColumn();
    moveDown();
    addNumber();
    changeColor();
    gameWon();
    gameOver();
  } else if (e.key === "ArrowLeft") {
    moveToLeft();
    colideRow();
    moveToLeft();
    addNumber();
    changeColor();
    gameWon();
    gameOver();
  } else if (e.key === "ArrowRight") {
    moveToRight();
    colideRow();
    moveToRight();
    addNumber();
    changeColor();
    gameWon();
    gameOver();
  }
}

document.addEventListener("keydown", move);

// Chech for Win

function gameWon() {
  if (squares.some((sqr) => sqr.textContent == 2048)) {
    gameResult.textContent = "Game Won";
    document.removeEventListener("keydown", move);
    if (score > +highscore) {
      localStorage.setItem("highscore", JSON.stringify(score));
      highscore = localStorage.getItem("highscore");
      showHighscore.textContent = highscore;
    }
  }
}

function gameOver() {
  if (squares.every((sqr) => sqr.textContent != 0)) {
    gameResult.textContent = "Game Over";
    document.removeEventListener("keydown", move);
    if (score > +highscore) {
      localStorage.setItem("highscore", JSON.stringify(score));
      highscore = localStorage.getItem("highscore");
      showHighscore.textContent = highscore;
    }
  }
}

// Color change

function changeColor() {
  for (const square of squares) {
    if (square.textContent == 0) {
      square.style.backgroundColor = "brown";
    } else if (square.textContent == 2) {
      square.style.backgroundColor = "rgb(250, 38, 38)";
    } else if (square.textContent == 4) {
      square.style.backgroundColor = "rgb(250, 80, 38)";
    } else if (square.textContent == 8) {
      square.style.backgroundColor = "rgb(250, 140, 38)";
    } else if (square.textContent == 16) {
      square.style.backgroundColor = "rgb(250, 38, 100)";
    } else if (square.textContent == 32) {
      square.style.backgroundColor = "rgb(250, 170, 100)";
    } else if (square.textContent == 64) {
      square.style.backgroundColor = "rgb(250, 200, 200)";
    } else if (square.textContent == 128) {
      square.style.backgroundColor = "rgb(100, 150, 38)";
    } else if (square.textContent == 256) {
      square.style.backgroundColor = "rgb(20, 38, 38)";
    } else if (square.textContent == 512) {
      square.style.backgroundColor = "rgb(40, 240, 38)";
    } else if (square.textContent == 1024) {
      square.style.backgroundColor = "rgb(140, 140, 145)";
    } else if (square.textContent == 2048) {
      square.style.backgroundColor = "rgb(200, 10, 120)";
    }
  }
}

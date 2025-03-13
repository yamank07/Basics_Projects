document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector(".score");
  const resultDisplay = document.querySelector(".result");
  //   const newGameBtn = document.querySelector(".btn");
  const width = 4;
  const squares = [];
  let score = 0;

  //   Creating board
  const createBoard = () => {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("DIV");
      square.innerHTML = 0;
      square.setAttribute("class", "square");
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    // console.log(squares);
  };
  createBoard();

  //   Check for 2048 tile to win
  const checkForWin = () => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML === 2048) {
        resultDisplay.innerHTML = "Congratulation, You have <b>won</b>!";
        resultDisplay.style.color = "green";
        document.removeEventListener("keydown", control);
        setTimeout(clearInterval, 3000);
      }
    }
  };

  // Check for no more 0s to add to lose.
  const checkForGameOver = () => {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultDisplay.style.color = "red";
      resultDisplay.innerHTML = "Sorry, You Lost!";
      document.removeEventListener("keydown", control);
      setTimeout(clearInterval, 3000);
    }
  };

  //   Generate 2 in random grid squares
  const generate2 = () => {
    const randIndex = Math.floor(Math.random() * squares.length);
    // console.log(randIndex);
    if (squares[randIndex].innerHTML == 0) {
      squares[randIndex].innerHTML = 2;
      checkForGameOver();
    } else generate2();
  };
  generate2();
  generate2();

  //   Move right
  const moveRight = () => {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        // console.log(row);

        let filteredRow = row.filter((num) => num);
        // console.log(filteredRow);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);
        // console.log(newRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  };

  //   Move left
  const moveLeft = () => {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        let total1 = squares[i].innerHTML;
        let total2 = squares[i + 1].innerHTML;
        let total3 = squares[i + 2].innerHTML;
        let total4 = squares[i + 3].innerHTML;
        let row = [
          parseInt(total1),
          parseInt(total2),
          parseInt(total3),
          parseInt(total4),
        ];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);
        // console.log(newRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  };

  //   Move up
  const moveUp = () => {
    for (let i = 0; i < width; i++) {
      let total1 = squares[i].innerHTML;
      let total2 = squares[i + width].innerHTML;
      let total3 = squares[i + width * 2].innerHTML;
      let total4 = squares[i + width * 3].innerHTML;
      let col = [
        parseInt(total1),
        parseInt(total2),
        parseInt(total3),
        parseInt(total4),
      ];
      //   console.log(col);

      let filteredCol = col.filter((num) => num);
      let missing = 4 - filteredCol.length;
      let zeros = Array(missing).fill(0);
      let newCol = filteredCol.concat(zeros);
      //   console.log(newCol);

      squares[i].innerHTML = newCol[0];
      squares[i + width].innerHTML = newCol[1];
      squares[i + width * 2].innerHTML = newCol[2];
      squares[i + width * 3].innerHTML = newCol[3];
    }
  };

  //   Move down
  const moveDown = () => {
    for (let i = 0; i < width; i++) {
      let total1 = squares[i].innerHTML;
      let total2 = squares[i + width].innerHTML;
      let total3 = squares[i + width * 2].innerHTML;
      let total4 = squares[i + width * 3].innerHTML;
      let col = [
        parseInt(total1),
        parseInt(total2),
        parseInt(total3),
        parseInt(total4),
      ];

      let filteredCol = col.filter((num) => num);
      let missing = 4 - filteredCol.length;
      let zeros = Array(missing).fill(0);
      let newCol = zeros.concat(filteredCol);

      squares[i].innerHTML = newCol[0];
      squares[i + width].innerHTML = newCol[1];
      squares[i + width * 2].innerHTML = newCol[2];
      squares[i + width * 3].innerHTML = newCol[3];
    }
  };

  //   Combine row numbers
  const combineRow = () => {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let totalVal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = totalVal;
        squares[i + 1].innerHTML = 0;
        score += totalVal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  };

  //   Combine column numbers
  const combineColumn = () => {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let totalVal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = totalVal;
        squares[i + width].innerHTML = 0;
        score += totalVal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  };

  //   Functions to navigate through buttons
  const control = (e) => {
    if (e.key === "ArrowRight") {
      keyRight();
    //   resultDisplay.innerHTML = "Join the number to get <b>2048</b> tile!";
    } else if (e.key === "ArrowLeft") {
      keyLeft();
    //   resultDisplay.innerHTML = "Join the number to get <b>2048</b> tile!";
    } else if (e.key === "ArrowUp") {
      keyUp();
    //   resultDisplay.innerHTML = "Join the number to get <b>2048</b> tile!";
    } else if (e.key === "ArrowDown") {
      keyDown();
    //   resultDisplay.innerHTML = "Join the number to get <b>2048</b> tile!";
    } else {
    //   resultDisplay.innerHTML = "Press <b>Arrow keys</b> to play the game..";
      control();
    }
  };

  document.addEventListener("keydown", control);

  //   Arrow right button
  const keyRight = () => {
    moveRight();
    combineRow();
    moveRight();
    generate2();
  };

  //   Arrow left button
  const keyLeft = () => {
    moveLeft();
    combineRow();
    moveLeft();
    generate2();
  };

  //   Arrow up button
  const keyUp = () => {
    moveUp();
    combineColumn();
    moveUp();
    generate2();
  };

  //   Arrow down button
  const keyDown = () => {
    moveDown();
    combineColumn();
    moveDown();
    generate2();
  };

  const clear = () => {
    clearInterval(timer);
  };

  //   Add colors to the same type of tiles
  const addColours = () => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0)
        squares[i].style.backgroundColor = "#afa192";
      else if (squares[i].innerHTML == 2)
        squares[i].style.backgroundColor = "#eee4da";
      else if (squares[i].innerHTML == 4)
        squares[i].style.backgroundColor = "#ede0c8";
      else if (squares[i].innerHTML == 8)
        squares[i].style.backgroundColor = "#f2b179";
      else if (squares[i].innerHTML == 16)
        squares[i].style.backgroundColor = "#ffcea4";
      else if (squares[i].innerHTML == 32)
        squares[i].style.backgroundColor = "#e8c064";
      else if (squares[i].innerHTML == 64)
        squares[i].style.backgroundColor = "#ffab6e";
      else if (squares[i].innerHTML == 128)
        squares[i].style.backgroundColor = "#fd9982";
      else if (squares[i].innerHTML == 256)
        squares[i].style.backgroundColor = "#ead79c";
      else if (squares[i].innerHTML == 512)
        squares[i].style.backgroundColor = "#76daff";
      else if (squares[i].innerHTML == 1024)
        squares[i].style.backgroundColor = "#beeaa5";
      else if (squares[i].innerHTML == 2048)
        squares[i].style.backgroundColor = "#d7d4f7";
    }
  };
  addColours();

  let timer = setInterval(addColours, 50);

  //   New Game
  //   const newGame = () => {
  //     resultDisplay.innerHTML = "Join the number to get <b>2048</b> tile!";
  //     scoreDisplay.innerHTML = "Score: <b>0</b>";
  //     createBoard();
  //     generate2();
  //     generate2();
  //   };

  //   newGameBtn.addEventListener("onclick", newGame);
});

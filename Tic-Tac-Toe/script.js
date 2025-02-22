let msgContainer = document.querySelector(".msg-container");
let resetBtn = document.querySelector("#resetGame-btn");
let newBtn = document.querySelector("#newGame-btn");
let winnerMsg = document.querySelector("#gameWinner");
let btns = document.querySelectorAll(".btn");

let playerO = true;
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const disableBtn = () => {
  for (let btn of btns) {
    btn.disabled = true;
  }
};

const enableBtn = () => {
  for (let btn of btns) {
    playerO = true;
    btn.disabled = false;
    btn.innerText = "";
  }
};

const newGameFunc = () => {
  msgContainer.classList.add("hide");
  resetBtn.classList.remove("hide");
  enableBtn();
};
newBtn.addEventListener("click", newGameFunc);

const resetGameFunc = () => {
  enableBtn();
};
resetBtn.addEventListener("click", resetGameFunc);

btns.forEach((box) => {
  box.addEventListener("click", () => {
    if (playerO) {
      box.innerText = "O";
      playerO = false;
      box.disabled = true;
    } else {
      box.innerText = "X";
      playerO = true;
      box.disabled = true;
    }
    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = btns[pattern[0]].innerText;
    let pos2Val = btns[pattern[1]].innerText;
    let pos3Val = btns[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log(`The winner is Player${pos1Val}.`);
        showWinner(pos1Val);
      }
    }
  }
};

const showWinner = (pos1Val) => {
  winnerMsg.innerText = `Congratulation, the winner is Player ${pos1Val}.`;
  winnerMsg.style.fontSize = "2vw";
  winnerMsg.style.color = "#fff";
  winnerMsg.style.marginBottom = "20px";
  msgContainer.classList.remove("hide");
  resetBtn.classList.add("hide");
  disableBtn();
};
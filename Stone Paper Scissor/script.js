const userChoice = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userRecord = document.querySelector("#userRecord");
let compRecord = document.querySelector("#compRecord");
let userScore = 0;
let compScore = 0;
let options = ["rock", "paper", "scissor"];

userChoice.forEach((choice) => {
  choice.addEventListener("click", () => {
    let userOpt = choice.getAttribute("id");
    // console.log(userOpt);
    let compOpt = getCompChoice(options);
    // console.log(compOpt);
    showWinner(userOpt, compOpt);
  });
});

let getCompChoice = (options) => {
  let randInd = Math.floor(Math.random() * 3);
  return options[randInd];
};

let showWinner = (userOpt, compOpt) => {
  if (userOpt === compOpt) {
    msg.innerText = "It's a tie!";
    msg.style.backgroundColor = "#416788";
  } else {
    if (userOpt === "rock") {
      //compOpt = paper, scissor
      let boolScore = compOpt === "paper" ? false : true;
      updateScore(boolScore);
      updateMsg(userOpt, compOpt, boolScore);
    } else if (userOpt === "paper") {
      // compOpt = scissor, rock
      let boolScore = compOpt === "scissor" ? false : true;
      updateScore(boolScore);
      updateMsg(userOpt, compOpt, boolScore);
    } else {
      // compOpt = rock, paper
      let boolScore = compOpt === "rock" ? false : true;
      updateScore(boolScore);
      updateMsg(userOpt, compOpt, boolScore);
    }
  }
};

let updateScore = (boolScore) => {
  if (boolScore) {
    userScore++;
    userRecord.innerText = userScore;
  } else {
    compScore++;
    compRecord.innerText = compScore;
  }
};

let updateMsg = (userOpt, compOpt, boolScore) => {
  if (boolScore) {
    msg.innerText = `Your choice ${userOpt} won by beating ${compOpt}`;
    msg.style.backgroundColor = "green";
  } else {
    msg.innerText = `Your choice ${userOpt} lose by ${compOpt}`;
    msg.style.backgroundColor = "red";
  }
};

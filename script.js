const newGame = document.querySelector(".btn--new");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");

const dice = document.querySelector(".dice");

let dices = ["dice-1.png", "dice-2.png", "dice-3.png", "dice-4.png", "dice-5.png", "dice-6.png"];

const ElCurrentScorePlayerOne = document.querySelector(".current-score-1");
const ElCurrentScorePlayerTwo = document.querySelector(".current-score-2");

const ElTotalScorePlayerOne = document.querySelector(".total-score-1");
const ElTotalScorePlayerTwo = document.querySelector(".total-score-2");

const card1 = document.querySelector(".card-1");
const card2 = document.querySelector(".card-2");

const winnerContainer = document.querySelector(".winner-container");
const overlay = document.querySelector(".overlay");

const winner = document.querySelector(".winner");
const closeIcon = document.querySelector(".close-icon");

let randomNumber;
let currentScore = 0;

let playerOneScore = 0;
let playerTwoScore = 0;

let player = 1;

function rolling() {
  return new Promise((resolve, reject) => {
    let rn;
    let rollingDice = setInterval(() => {
      // let rn = Math.floor(Math.random() * 6) + 1;
      rn = randomNumberGenerator();
      // setDice(rn);
      setDice(rn);
    }, 100);

    setTimeout(() => {
      resolve(rn);
      clearInterval(rollingDice);
    }, 2000);
  });
}

function setDice(number) {
  dice.src = `./dice-${number}.png`;
}

function randomNumberGenerator() {
  return Math.floor(Math.random() * 6) + 1;
}

roll.addEventListener("click", rollDice);
function rollDice() {
  //   randomNumber = rolling();
  rolling().then((rn) => {
    randomNumber = rn;

    setDice(randomNumber);

    if (randomNumber == 1) {
      resetCurrentScore();
      switchPlayer();
    }

    if (randomNumber > 1) {
      updateCurrentScore();
    }
  });
}
hold.addEventListener("click", holdDice);

function holdDice() {
  updateTotalScore();
  setTotalScore();
  resetCurrentScore();
  checkWinner();
  switchPlayer();
}

newGame.addEventListener("click", () => {
  resetCurrentScore();
  resetTotalScore();
  resetPlayer();
});

function switchPlayer() {
  if (player == 1) {
    player = 2;
    card1.classList.toggle("active");
    card2.classList.toggle("active");
    return;
  }
  if (player == 2) {
    player = 1;
    card1.classList.toggle("active");
    card2.classList.toggle("active");
    return;
  }
}

function resetCurrentScore() {
  currentScore = 0;
  ElCurrentScorePlayerOne.textContent = 0;
  ElCurrentScorePlayerTwo.textContent = 0;
}

function updateCurrentScore() {
  currentScore = currentScore + randomNumber;

  if (player == 1) {
    ElCurrentScorePlayerOne.textContent = currentScore;
  }

  if (player == 2) {
    ElCurrentScorePlayerTwo.textContent = currentScore;
  }
}

function updateTotalScore() {
  if (player == 1) {
    playerOneScore = playerOneScore + currentScore;
  }

  if (player == 2) {
    playerTwoScore = playerTwoScore + currentScore;
  }
}

function setTotalScore() {
  if (player == 1) {
    ElTotalScorePlayerOne.textContent = playerOneScore;
    resetCurrentScore();
  }

  if (player == 2) {
    ElTotalScorePlayerTwo.textContent = playerTwoScore;
    resetCurrentScore();
  }
}

function resetTotalScore() {
  playerOneScore = 0;
  playerTwoScore = 0;
  ElTotalScorePlayerOne.textContent = 0;
  ElTotalScorePlayerTwo.textContent = 0;
}

function resetPlayer() {
  if (player == 2) {
    player = 1;
    card1.classList.toggle("active");
    card2.classList.toggle("active");
    return;
  }
}

function checkWinner() {
  if (
    currentScore >= 50 ||
    playerOneScore >= 50 ||
    playerTwoScore >= 50 ||
    playerOneScore + currentScore >= 50 ||
    playerTwoScore + currentScore >= 50
  ) {
    roll.removeEventListener("click", rollDice);
    hold.removeEventListener("click", holdDice);
    winner.textContent = player;

    winnerContainer.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
}

closeIcon.addEventListener("click", (e) => {
  e.currentTarget.parentElement.classList.add("hidden");
  overlay.classList.add("hidden");
});

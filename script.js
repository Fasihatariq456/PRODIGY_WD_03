let turn = "X";
let isGameOver = false;
let winningCombo = [];
let moves = 0;

// Function to change the turn
const changeTurn = () => {
  return turn === "X"? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
  let elements = document.querySelectorAll(".element");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  wins.forEach((win) => {
    if (
      elements[win[0]].innerText === elements[win[1]].innerText &&
      elements[win[1]].innerText === elements[win[2]].innerText &&
      elements[win[0]].innerText!== ""
    ) {
      winningCombo = win;
      document.querySelector(".info").innerText = elements[win[0]].innerText + " Won";
      isGameOver = true;
      highlightWinningCombo();
    }
  });

  // Check for a draw
  if (moves === 9 && !isGameOver) {
    document.querySelector(".info").innerText = "It's a draw!";
    isGameOver = true;
    setTimeout(resetGame, 2000);
  }
};

// Function to highlight the winning combo
const highlightWinningCombo = () => {
  let elements = document.querySelectorAll(".element");
  winningCombo.forEach((index) => {
    elements[index].classList.add("win");
  });
};

// Function to reset the game
const resetGame = () => {
  document.querySelectorAll(".element").forEach((element) => {
    element.innerText = "";
    element.classList.remove("win");
  });
  turn = "X";
  isGameOver = false;
  winningCombo = [];
  moves = 0;
  document.querySelector(".info").innerText = "Turn for " + turn;
};

// Add event listener to each element
document.querySelectorAll(".element").forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerText === "" &&!isGameOver) {
      element.innerText = turn;
      moves++;
      turn = changeTurn();
      checkWin();
      if (!isGameOver) {
        document.querySelector(".info").innerText = "Turn for " + turn;
      }
    }
  });
});

// Add event listener to reset button
document.getElementById("reset").addEventListener("click", resetGame);
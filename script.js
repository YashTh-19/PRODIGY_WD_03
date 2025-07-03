const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = `😐 It's a Draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      highlightWinner([a, b, c]);
      return true;
    }
  }
  return false;
}

function highlightWinner(indices) {
  indices.forEach(index => {
    document.querySelector(`.cell[data-index="${index}"]`).classList.add("winning-cell");
  });
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player X's Turn`;

  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.className = "cell"; // reset all styles
  });
}

board.addEventListener("click", handleCellClick);
resetBtn.addEventListener("click", resetGame);

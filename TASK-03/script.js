const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');
let isXTurn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(currentPlayer) {
  return winningCombinations.some(combination =>
    combination.every(index => cells[index].classList.contains(currentPlayer))
  );
}

function handleClick(event) {
  const cell = event.target;
  const currentPlayer = isXTurn ? 'x' : 'o';
  cell.textContent = currentPlayer.toUpperCase();
  cell.classList.add('taken', currentPlayer);

  if (checkWin(currentPlayer)) {
    winnerMessage.textContent = `${currentPlayer.toUpperCase()} Wins!`;
    winnerMessage.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    return;
  }

  if ([...cells].every(cell => cell.classList.contains('taken'))) {
    winnerMessage.textContent = 'Draw!';
    winnerMessage.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    return;
  }

  isXTurn = !isXTurn;
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
  isXTurn = true;
  winnerMessage.classList.add('hidden');
  restartButton.classList.add('hidden');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
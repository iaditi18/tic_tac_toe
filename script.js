const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winningMessage');
const messageText = document.getElementById('messageText');
const restartButton = document.getElementById('restartButton');

let isCircleTurn;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isCircleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('X');
    cell.classList.remove('O');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHover();
  winningMessage.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'O' : 'X';
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isCircleTurn = !isCircleTurn;
    setBoardHover();
  }
}

function endGame(draw) {
  if (draw) {
    messageText.innerText = "It's a Draw!";
  } else {
    messageText.innerText = `${isCircleTurn ? "O" : "X"} Wins!`;
  }
  winningMessage.classList.add('show');
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function setBoardHover() {
  board.classList.remove('X');
  board.classList.remove('O');
  board.classList.add(isCircleTurn ? 'O' : 'X');
}

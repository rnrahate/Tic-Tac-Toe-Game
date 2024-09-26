const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('reset-btn');
const winnerNameElement = document.getElementById('winner-name');

let currentPlayer = 'X';
let isGameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== '' || !isGameActive) {
        return;
    }

    cell.textContent = currentPlayer;
    boardState[cellIndex] = currentPlayer;

    checkWinner();
    togglePlayer();
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const a = boardState[condition[0]];
        const b = boardState[condition[1]];
        const c = boardState[condition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        declareWinner(currentPlayer);
        isGameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        declareWinner('Draw');
        isGameActive = false;
    }
}

function declareWinner(winner) {
    if (winner === 'Draw') {
        winnerNameElement.textContent = 'It\'s a Draw!';
    } else {
        winnerNameElement.textContent = `${winner} Wins!`;
    }
}

function resetGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    cells.forEach(cell => (cell.textContent = ''));
    winnerNameElement.textContent = 'None';
}

document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.rules-container').classList.toggle('collapsed');
});
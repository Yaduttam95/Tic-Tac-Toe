document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const message = document.getElementById('message');
  const resetButton = document.getElementById('resetButton');
  const checkbox = document.getElementById('checkbox');
  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];
  const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.add(`${currentTheme}-mode`);
  checkbox.checked = currentTheme === 'dark';

  checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
          document.body.classList.replace('light-mode', 'dark-mode');
          localStorage.setItem('theme', 'dark');
      } else {
          document.body.classList.replace('dark-mode', 'light-mode');
          localStorage.setItem('theme', 'light');
      }
  });

  cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
  });

  resetButton.addEventListener('click', resetGame);

  function handleCellClick(event) {
      const cell = event.target;
      const cellIndex = cell.getAttribute('data-index');

      if (gameState[cellIndex] !== '' || checkWin()) return;

      gameState[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWin()) {
          message.textContent = `Player ${currentPlayer} wins!`;
          return;
      }

      if (!gameState.includes('')) {
          message.textContent = `It's a draw!`;
          return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWin() {
      return winningCombinations.some(combination => {
          return combination.every(index => {
              return gameState[index] === currentPlayer;
          });
      });
  }

  function resetGame() {
      gameState = ['', '', '', '', '', '', '', '', ''];
      cells.forEach(cell => {
          cell.textContent = '';
      });
      message.textContent = '';
      currentPlayer = 'X';
  }
});

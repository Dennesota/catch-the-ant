document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('game-grid');
    const catchScoreElem = document.getElementById('catch-score');
    const missScoreElem = document.getElementById('miss-score');
    const pointsToWin = document.getElementById('points-win');
    const pointsToLose = document.getElementById('points-lose');
    let catchScore = 0;
    let missScore = 0;
    let activeCell = null;

    // Create the grid
    function createGrid(size) {
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${size}, 50px)`;
        grid.style.gridTemplateRows = `repeat(${size}, 50px)`;

        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('div');
            const img = document.createElement('img');
            img.src = 'google-icon.png'; // Placeholder for the Google icon image
            cell.appendChild(img);
            cell.addEventListener('click', () => catchGoogle(cell));
            grid.appendChild(cell);
        }
    }

    // Function to catch the Google icon
    function catchGoogle(cell) {
        if (cell === activeCell) {
            catchScore++;
            catchScoreElem.textContent = catchScore;
            resetActiveCell();
        }
    }

    // Randomly activate a cell
    function activateRandomCell() {
        resetActiveCell();
        const cells = document.querySelectorAll('#game-grid div');
        activeCell = cells[Math.floor(Math.random() * cells.length)];
        activeCell.classList.add('active');
    }

    // Reset active cell
    function resetActiveCell() {
        if (activeCell) {
            activeCell.classList.remove('active');
        }
    }

    // Update the game loop
    function gameLoop() {
        if (activeCell) {
            missScore++;
            missScoreElem.textContent = missScore;
            if (missScore >= pointsToLose.value) {
                alert('You lost!');
                resetGame();
            }
        }
        activateRandomCell();
        if (catchScore < pointsToWin.value) {
            setTimeout(gameLoop, 1000); // Adjust the speed as needed
        } else {
            alert('You win!');
            resetGame();
        }
    }

    // Reset the game
    function resetGame() {
        catchScore = 0;
        missScore = 0;
        catchScoreElem.textContent = 0;
        missScoreElem.textContent = 0;
        resetActiveCell();
    }

    // Start the game
    createGrid(8); // Default grid size 8x8
    gameLoop();
});

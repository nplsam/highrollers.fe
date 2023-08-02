// Function to simulate rolling a dice
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// FUNCTION TO HANDLE PLAYERS TURN
function takeTurn() {
    previousPosition = playerPosition
    const diceRoll = rollDice();

    // DISPLAY DICE ROLL WITH MODAL
    // const diceRollResultElement = document.getElementById('diceRollResult')
    alert(`You rolled a ${diceRoll}`);

  // Calculate the target position based on perimeter movement
  const perimeterLength = boardColumns * 2 + boardRows * 2 - 4; // Length of the outer perimeter
  const currentPositionOnPerimeter = playerPosition % perimeterLength;
  let targetPosition = playerPosition + diceRoll;

  // Adjust the target position to stay on the outer perimeter
  if (targetPosition >= perimeterLength) {
    targetPosition = perimeterLength - 1;
  }

  // Move the player on the board
  movePlayer(targetPosition);

  updatePlayerIconPosition();

    // Roll the second dice
    const diceRoll2 = rollDice();
    document.getElementById('secondDiceRollResult').textContent = diceRoll2;

    // Determine the question type (easy, medium or hard) based on the second dice roll
    let questionType;
    if (diceRoll2 >= 1 && diceRoll2 <= 2) {
      questionType = 'easy';
    } else if (diceRoll2 >= 3 && diceRoll2 <= 4) {
      questionType = 'medium';
    } else {
      questionType = 'hard';
    }

    // Fetch the random image and question based on the question type
    fetchQuestion(questionType);

  // Check the type of space the player landed on
  const currentSpace = spaces[playerPosition];
  if (currentSpace.label === 'easy') {
    handleEasySpace();
  } else if (currentSpace.label === 'hard') {
    // Implement handling for "hard" spaces
    // (if they have any specific functionality)
  } else {
    // Handle other types of spaces if needed
  }
}

 // Function to update the player icon position
 function updatePlayerIconPosition() {
    const board = document.getElementById('board');
    const playerIcon = document.getElementById('playerIcon');

    const cellWidth = board.offsetWidth / boardColumns; // Width of each cell
    const cellHeight = board.offsetHeight / boardRows; // Height of each cell
    // const perimeterLength = boardColumns * 2 + boardRows * 2 - 4; // Length of the outer perimeter

    const row = Math.floor(playerPosition / boardColumns); // Row of the target position
    const col = playerPosition % boardColumns; // Column of the target position
  
    // Calculate the top and left positions for the icon
    let topPosition, leftPosition;
    if (playerPosition < boardColumns) {
    // Top row of the board
    topPosition = 0;
    leftPosition = col * cellWidth;
    } else if (playerPosition < boardColumns + boardRows - 1) {
    // Right column of the board (excluding bottom-right corner)
    topPosition = (row + 1) * cellHeight;
    leftPosition = (boardColumns - 1) * cellWidth;
    } else if (playerPosition < boardColumns * 2 + boardRows - 2) {
    // Bottom row of the board (excluding bottom-left corner)
    topPosition = (boardRows - 1) * cellHeight;
    leftPosition = (boardColumns - col - 2) * cellWidth; // Adjust for the bottom row horizontally
    } else {
    // Left column of the board (including bottom-left corner)
    topPosition = (boardRows - row - 2) * cellHeight; // Adjust for the left column vertically
    leftPosition = 0;
    }

    playerIcon.style.top = `${topPosition}px`;
    playerIcon.style.left = `${leftPosition}px`;
  }

module.exports = {
    rollDice,
    takeTurn,
    updatePlayerIconPosition
}
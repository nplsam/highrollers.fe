//  BASIC BOARD GAME DEFINITION
const boardRows = 5;
const boardColumns = 8
const boardSize = boardRows * boardColumns;

// PLAYERS POSITION STARTS AT 0
let playerPosition = 0;

// DECLARE submitButton AS A GLOBAL VARIABLE
const submitButton = document.getElementById('submitAnswer');

// GLOBAL VARIABLES IN ORDER FOR THE GAME TO WORK
let diceRoll
let submitButtonListener
let previousPosition = playerPosition

// FUNCTION TO GENERATE DYNAMIC BOARD GAME (NOT NEEDED AS WE HAVE GRID LOGIC ALREADY IMPLEMENTED)
function generateBoard() {
    const boardContainer = document.getElementById('board');

    // CLEAR PREVIOUS BOARD
    boardContainer.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('board-cell');
      cell.textContent = i + 1;
      boardContainer.appendChild(cell);
    }
  }

// FUNCTION TO SIMULATE ROLLING A DICE
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// FUNCTION TO MOVE THE PLAYER ON THE BOARD
function movePlayer(targetPosition) {
    playerPosition = targetPosition
}

// FUNCTION TO HANDLE THE USER SUBMITTED ANSWER
function handleSubmitAnswer(correctCountry) {
    // GET USER ANSWER
    const userAnswer = document.getElementById('userAnswer').value;

     // VALIDATE USER ANSWER
    if (userAnswer && userAnswer.trim().toLowerCase() === correctCountry.toLowerCase()) {
        alert('Correct! You stay at this position.');
        // THE PLAYER'S POSITION DOESN'T CHANGE AS THE ANSWER IS CORRECT
    } else {
        alert(`Wrong answer! You move back to position ${previousPosition+1}.`);
       // MOVE THE PLAYER BACK TO THE POSITION THEY HAD BEFORE ROLLING THE DICE
        movePlayer(previousPosition);
    };

    document.getElementById('userAnswer').value = ''

    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    // REMOVE THE EVENT LISTENER TO PREVENT ACCUMULATION (THIS WAS A FIX FOR THE MODAL NOT LEAVING THE SCREEN)
    submitButton.removeEventListener('click', submitButtonListener);

    // CALLS updatePlayerIconPosition
    updatePlayerIconPosition();
}

// FUNCTION THAT FETCHES COUNTRY IMAGES FROM THE API
async function fetchQuestion(questionType) {
    const url = `http://localhost:3000/countries/random/${questionType}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const image = data.imageUrl;
      const correctCountry = data.country;

      // DISPLAYS THE IMAGE IN THE MODAL
      const modalImage = document.getElementById('modal-image');
      modalImage.src = image;
      const modal = document.getElementById('modal');
      modal.style.display = 'block';

      // REMOVE THE EVENT LISTENER TO PREVENT ACCUMULATION (THIS WAS A FIX FOR THE MODAL NOT LEAVING THE SCREEN)
      if (submitButtonListener) {
        submitButton.removeEventListener('click', submitButtonListener)
      }

      submitButtonListener = function () {
        handleSubmitAnswer(correctCountry)
      }
      submitButton.addEventListener('click', submitButtonListener)

      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
  }

// FUNCTION TO HANDLE PLAYERS TURN
function takeTurn() {
  // CURRENT PLAYER POSITION
    previousPosition = playerPosition
    const diceRoll = rollDice();

  // BASIC ALERT TO SAY WHAT THE USER ROLLS (CAN IMPLEMENT IN MODAL OR DICE ANIMATION)
    alert(`You rolled a ${diceRoll}`);

  // CALCULATE THE TARGET POSITION BASED ON PERIMETER MOVEMENT (IGNORE AS GRID IS ALREADY MADE)
  const perimeterLength = boardColumns * 2 + boardRows * 2 - 4;
  let targetPosition = playerPosition + diceRoll;

  // ADJUSTS TARGET POSITION TO STAY ON OUTER PERIMETER
  if (targetPosition >= perimeterLength) {
    targetPosition = perimeterLength - 1;
  }

  // MOVE PLAYER ON BOARD
  movePlayer(targetPosition);

  // UPDATE ICON 
  updatePlayerIconPosition();

    // SECOND ROLL TO DETERMINE DIFFICULTY
    const diceRoll2 = rollDice();
    document.getElementById('secondDiceRollResult').textContent = diceRoll2;

    // DETERMINES QUESTION TYPE BASED ON diceRoll2
    let questionType;
    if (diceRoll2 >= 1 && diceRoll2 <= 2) {
      questionType = 'easy';
    } else if (diceRoll2 >= 3 && diceRoll2 <= 4) {
      questionType = 'medium';
    } else {
      questionType = 'hard';
    }

    // FETCH THE QUESTION, AND A RANDOM IMAGE DEPENDENT ON THE QUESTION TYPE (EASY, MEDIUM, HARD)
    fetchQuestion(questionType);
}

// FUNCTION TO CREATE THE PLAYERS ICON ON THE BOARD (NOT SURE IF NEEDED)
function createPlayerIcon() {
    const board = document.getElementById('board');
    const playerIcon = document.createElement('div');
    playerIcon.id = 'playerIcon';
    board.appendChild(playerIcon);
  }

 // // FUNCTION TO UPDATE PLAYER ICON POSITION
 function updatePlayerIconPosition() {
    const board = document.getElementById('board');
    const playerIcon = document.getElementById('playerIcon');

    const cellWidth = board.offsetWidth / boardColumns; 
    const cellHeight = board.offsetHeight / boardRows;

    // ROW OF TARGET POSITION
    const row = Math.floor(playerPosition / boardColumns);
    // COLUMN OF TARGET POSITION
    const col = playerPosition % boardColumns;
  
    // CALCULATE TOP AND LEFT POSITIONS FOR ICON
    let topPosition, leftPosition;
    if (playerPosition < boardColumns) {
    // TOP ROW
    topPosition = 0;
    leftPosition = col * cellWidth;
    } else if (playerPosition < boardColumns + boardRows - 1) {
    // RIGHT COLUMN 
    topPosition = (row + 1) * cellHeight;
    leftPosition = (boardColumns - 1) * cellWidth;
    } else if (playerPosition < boardColumns * 2 + boardRows - 2) {
    // BOTTOM ROW
    topPosition = (boardRows - 1) * cellHeight;
    leftPosition = (boardColumns - col - 2) * cellWidth; // Adjust for the bottom row horizontally
    } else {
    // LEFT COLUMN 
    topPosition = (boardRows - row - 2) * cellHeight; // Adjust for the left column vertically
    leftPosition = 0;
    }

    playerIcon.style.top = `${topPosition}px`;
    playerIcon.style.left = `${leftPosition}px`;
  }

 // FUNCTION TO START THE GAME
 function startGame() {
    generateBoard();
    createPlayerIcon();

    const rollButton = document.getElementById('rollButton');
    rollButton.addEventListener('click', takeTurn);
  }

startGame();

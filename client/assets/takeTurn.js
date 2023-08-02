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
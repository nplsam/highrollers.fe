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

let diceCanvas = document.getElementById('diceCanvas');
let context = diceCanvas.getContext('2d');

const animateDice = (sprite) => {
    let numRows = 1;
    let numCols = 6;
    let frameWidth = sprite.width / numCols;
    let frameHeight = sprite.height / numRows;

    let currentFrame = 0;


    setInterval(function(){
        let maxFrame = numCols * numRows - 1;
        if (currentFrame > maxFrame){
        currentFrame = 0;


        let column = currentFrame % numCols;
        let row = Math.floor(currentFrame / numCols);

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(sprite, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 10, 30, frameWidth, frameHeight);
    }
    },100);
}



module.exports = animateDice;
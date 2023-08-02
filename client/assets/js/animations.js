



const animateDice = () => {
    let numRows = 1;
    let numCols = 6;
    let frameWidth = sprite.width / numCols;
    let frameHeight = sprite.height / numRows;

    let currentFrame = 0;


    setInterval(function(){
        let maxFrame = numCols * numRows - 1;
        if (currentFrame > maxFrame){
        currentFrame = 0;
    }
    },100);
}
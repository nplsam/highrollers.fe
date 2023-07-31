
//ESTABLISHES CANVAS CONTEXT AND LOCATION.
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//TILEMAP 
const tileW = 40;
const tileH = 40;

const gridRows = 10;
const gridCols = 10;

const map = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

//Makes a continouos loop so game can be refreshed. Think of framerate.
const updateAll = () => {
    board.draw();
    window.requestAnimationFrame(updateAll);
}

//RUNS FUNCTION WHEN WINDOW HAS LOADED.
window.onload = () => {
    window.requestAnimationFrame(updateAll);
}

//DRAW MAP ON THE SCREEN
const createMap = () => {
    for(let eachRow = 0; eachRow < gridRows; eachRow++){
        for(let eachCol = 0; eachCol < gridCols; eachCol++){
            let arrIndex = eachRow * gridRows + eachCol;
            if(map[arrIndex] === 0) {
                ctx.fillStyle = 'lightgray'
                ctx.fillRect(tileW*eachCol,tileH * eachRow,tileW,tileH)
            }else {
                ctx.fillStyle = 'black';
                ctx.fillRect(tileW*eachCol,tileH * eachRow,tileW,tileH)
            }
        }
    }
}





//Classes
class Rectangle {
    constructor(x, y, height, width, color) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.color = color
        this.xmom = 0
        this.ymom = 0
    }
    draw(){
        ctx.lineWidth = 1
        ctx.fillStyle = this.color
        ctx.strokeStyle = "black"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
    move(){
        this.x+=this.xmom
        this.y+=this.ymom
    }
}
class Grid {
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.blocks = [];
        for(let q = 0; this.y < canvas.height; q++){
            for(let q = 0; this.x < canvas.width; q++){
                let block;
                if(Math.random() < .91){
                    block = new Rectangle(this.x, this.y, this.height, this.width, color);
                }else{
                    block = new Rectangle(this.x, this.y, this.height, this.width, "red");
                }
                this.blocks.push(block);
                this.x += this.width;
            }
            this.y += this.height;
            this.x = 0;
        }
    }
    draw(){
        for(let b = 0; b < this.blocks.length; b++){
            this.blocks[b].draw();
        }
    }
}

let board = new Grid(50, 50, "blue");

class Player {
    constructor(color, grid){
        this.grid = grid;
        this.body = new Circle(this.body = new Circle(10,10,Math.min(this.grid.width/4, this.grid.height/4), color),
        this.location = this.grid.blocks[Math.floor(Math.random()*this.grid.blocks.length)])
    }
}

////MAKES A CIRCLE
class Circle{
    constructor(x, y, radius, color, xmom = 0, ymom = 0){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.xmom = xmom
        this.ymom = ymom
        this.lens = 0
    }       
     draw(){
        tutorial_canvas_context.lineWidth = 0
        tutorial_canvas_context.strokeStyle = this.color
        tutorial_canvas_context.beginPath();
        tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
        tutorial_canvas_context.fillStyle = this.color
       tutorial_canvas_context.fill()
        tutorial_canvas_context.stroke(); 
    }
    move(){
        this.x += this.xmom
        this.y += this.ymom
    }
}


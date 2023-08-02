// const rollDice = require('./dice');


window.addEventListener('DOMContentLoaded', (event) => {
    let map = [
        "../Images/top-left-corner.png", "../Images/top-row.png", "../Images/top-row.png", "../Images/top-row.png", "../Images/top-row.png", "../Images/top-row.png", "../Images/top-row.png", "../Images/top-row.png", "../Images/top-row.png", "../Images/top-right-corner.png",
        "../Images/left-column.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/right-column.png",
        "../Images/left-column.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/right-column.png",
        "../Images/left-column.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/right-column.png",
        "../Images/left-column.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/right-column.png",
        "../Images/left-column.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/right-column.png",
        "../Images/left-column.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/right-column.png",
        "../Images/left-column.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/right-column.png",
        "../Images/left-column.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/center.png", "../Images/right-column.png",
        "../Images/bottom-left-corner.png", "../Images/bottom-row.png", "../Images/bottom-row.png", "../Images/bottom-row.png", "../Images/bottom-row.png", "../Images/bottom-row.png", "../Images/bottom-row.png", "../Images/bottom-row.png", "../Images/bottom-row.png", "../Images/bottom-right-corner.png",
    ]

    const gridRows = 10;
    const gridCols = 10;

    let keysPressed = {}

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
    });

    document.addEventListener('keyup', (event) => {
        delete keysPressed[event.key];
    });

    let tutorial_canvas = document.getElementById("gameCanvas");
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background = "#000000"


    class Rectangle {
        constructor(x, y, height, width, imgUrl) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.xmom = 0
            this.ymom = 0
            this.isImageLoaded = false

            this.img = new Image();
            this.img.onload = () => {
                this.isImageLoaded = true;
            };
            this.img.src = imgUrl;
        }
        draw() {
            tutorial_canvas_context.lineWidth = 0.1
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.strokeStyle = "black"
            if (this.isImageLoaded) {
                tutorial_canvas_context.drawImage(this.img, this.x, this.y, this.width, this.height)
            }
            tutorial_canvas_context.strokeRect(this.x, this.y, this.width, this.height)
        }
        move() {
            this.x += this.xmom
            this.y += this.ymom
        }
    }
    class Circle {
        constructor(x, y, radius, color, xmom = 0, ymom = 0) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.lens = 0
        }
        draw() {
            tutorial_canvas_context.lineWidth = 0
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke();
        }
        move() {
            this.x += this.xmom
            this.y += this.ymom
        }
    }

    class Grid {
        constructor(width, height, color) {
            this.width = width
            this.height = height
            this.x = 0
            this.y = 0
            this.blocks = []

            for (let eachRow = 0; eachRow < gridRows; eachRow++) {
                for (let eachCol = 0; eachCol < gridCols; eachCol++) {
                    let arrayIndex = eachRow * gridRows + eachCol;
                    const imgUrl = map[arrayIndex];

                    if (imgUrl) {
                        let block = new Rectangle(this.x, this.y, this.height, this.width, imgUrl)
                        this.blocks.push(block)
                    }
                    this.x += this.width
                }
                this.y += this.height
                this.x = 0
            }

        }
        draw() {
            for (let b = 0; b < this.blocks.length; b++) {
                this.blocks[b].draw()
            }
        }
    }

    class Agent {
        constructor(grid, color) {
            this.grid = grid
            this.body = new Circle(10, 10, Math.min(this.grid.width / 4, this.grid.height / 4), color)
            this.location = this.grid.blocks[Math.floor(Math.random() * this.grid.blocks.length)]
            this.boardCount = 0;
            this.moves = 0;
        }
        draw() {
            this.control()
            this.body.x = this.location.x + this.location.width / 2
            this.body.y = this.location.y + this.location.height / 2
            this.body.draw()
        }
        control() {
            if (keysPressed['w'] && this.moves >= 1) {
                console.log('working');
                console.log(this.boardCount);
                switch (true) {
                    case this.boardCount <= 8:
                        console.log('working board eval');
                        this.body.x += this.grid.width
                        this.boardCount++;
                        this.moves--;
                        break;
                    case this.boardCount <= 17:
                        console.log('working board eval 2');
                        this.body.y += this.grid.height;
                        this.boardCount++;
                        this.moves--;
                        break;
                    case this.boardCount <= 26:
                        console.log('working board eval 3');
                        this.body.x -= this.grid.width
                        this.boardCount++;
                        this.moves--;
                        break;
                    case this.boardCount <= 35:
                        console.log('working board eval 4');
                        this.body.y -= this.grid.height;
                        this.boardCount++;
                        this.moves--;
                        break;
                }
            }

            for (let g = 0; g < this.grid.blocks.length; g++) {
                if (this.body.x > this.grid.blocks[g].x) {
                    if (this.body.y > this.grid.blocks[g].y) {
                        if (this.body.x < this.grid.blocks[g].x + this.grid.blocks[g].width) {
                            if (this.body.y < this.grid.blocks[g].y + this.grid.blocks[g].height) {
                                if (this.grid.blocks[g].color != "red") {
                                    this.location = this.grid.blocks[g]
                                }
                            }
                        }
                    }
                }


            }
        }



    }



    let board = new Grid(57, 57, "blue")
    let player = new Agent(board, "white")


    window.setInterval(function () {

        board.draw()
        player.draw()
    }, 140)


    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    const diceBtn = document.getElementById('dice-btn');
    const diceResult = document.getElementById('diceResult');
    const moveDice = document.getElementById('moveDice');
    const diffDice = document.getElementById('diffDice');

    diceBtn.addEventListener('click', (e) => {

        moveDice.className = '';
        diffDice.className = '';

        moveDice.classList.add('spin-dice');
        diffDice.classList.add('spin-dice');

        e.preventDefault();
        const dice1 = rollDice();
        const dice2 = rollDice();
        player.moves = dice1;

        

        diceResult.textContent = `The first dice is ${dice1} and the second is ${dice2}`;
        
        setTimeout(function(){
            moveDice.classList.remove('spin-dice');
            diffDice.classList.remove('spin-dice');

            switch(dice1){
                case 1:
                    moveDice.classList.add('one-dice');
                    break;
                case 2:
                    moveDice.classList.add('two-dice');
                    break;
                case 3:
                    moveDice.classList.add('three-dice');
                    break;
                case 4:
                    moveDice.classList.add('four-dice');
                    break;
                case 5:
                    moveDice.classList.add('five-dice');
                    break;
                case 6:
                    moveDice.classList.add('six-dice');
                    break;
                
            }
            switch(dice2){
                case 1:
                    diffDice.classList.add('one-dice');
                    break;
                case 2:
                    diffDice.classList.add('two-dice');
                    break;
                case 3:
                    diffDice.classList.add('three-dice');
                    break;
                case 4:
                    diffDice.classList.add('four-dice');
                    break;
                case 5:
                    diffDice.classList.add('five-dice');
                    break;
                case 6:
                    diffDice.classList.add('six-dice');
                    break;
                
            }
        },1000)
        


        

    })


})
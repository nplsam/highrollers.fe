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
            if (this.moves >= 1) {
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
                if (this.prevPosition) {
                    if (
                        this.body.x === this.prevPosition.x &&
                        this.body.y === this.prevPosition.y
                    ) {
                        this.resetPosition()
                    }
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

    const diceBtn = document.getElementById('dice-btn');
    const moveDice = document.getElementById('moveDice');

    let canRollDice = true
    let isModalDisplayed = false
    let isDiceRolling = false
    let isFetchingQuestion = false

    diceBtn.addEventListener('click', (e) => {
        if (!isDiceRolling && !isModalDisplayed && canRollDice) {
            moveDice.className = '';
            moveDice.classList.add('spin-dice');
            isDiceRolling = true

            e.preventDefault();
            const dice1 = rollDice();
            
            setTimeout(function(){
                moveDice.classList.remove('spin-dice');
    
                switch(dice1){
                    case 1:
                        moveDice.classList.add('one-dice');
                        player.moves = dice1;
                        break;
                    case 2:
                        moveDice.classList.add('two-dice');
                        player.moves = dice1;
                        break;
                    case 3:
                        moveDice.classList.add('three-dice');
                        player.moves = dice1;
                        break;
                    case 4:
                        moveDice.classList.add('four-dice');
                        player.moves = dice1;
                        break;
                    case 5:
                        moveDice.classList.add('five-dice');
                        player.moves = dice1;
                        break;
                    case 6:
                        moveDice.classList.add('six-dice');
                        player.moves = dice1;
                        break;
                }  
            diceBtn.disabled = true
            questionBtn.disabled  = false
            canRollDice = false
            isDiceRolling = false
        }, 2000)
    };
})

function displayQuestionModal(image, correctCountry) {
    const modal = document.getElementById("myModal");
    const questionElement = document.getElementById("question");
    const questionImageElement = document.getElementById("questionImage");
    const submitBtn = document.getElementById("submitAnswer");
    const closeBtn = document.getElementsByClassName("close")[0];

    questionElement.textContent = `Guess the country based on the image`
    questionImageElement.src = image

    modal.style.display = "block";

    isModalDisplayed = true

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    submitBtn.onclick = function () {
        handleAnswerSubmission(correctCountry);
    };
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
    isModalDisplayed = false
  }

  function hideResultModal() {
    const resultModal = document.getElementById("resultModal");
    resultModal.style.display = "none";
  }

  function showResultModal(isCorrect) {
    const resultModal = document.getElementById("resultModal");
    const resultMessage = document.getElementById("resultMessage");
    const closeBtn = document.getElementsByClassName("close")[0];
  
    resultMessage.textContent = isCorrect ? "Correct, you stay at this position!" : "Incorrect, move back to your previous position!";
    resultModal.style.display = "block";
  
    closeBtn.onclick = function() {
      resultModal.style.display = "none";
    };
  
    window.onclick = function(event) {
      if (event.target === resultModal) {
        resultModal.style.display = "none";
      }
    };
    setTimeout(hideResultModal, 2000);
  }

function handleAnswerSubmission(correctCountry) {
    const answerInput = document.getElementById("answer");
    const answer = answerInput.value.trim().toLowerCase();

  
    if (answer === correctCountry.toLowerCase()) {
      closeModal();
      showResultModal(true)
    } else {
      closeModal()
      showResultModal(false)
    }
    answerInput.value = "";

    if (!questionBtn.disabled) {
        diceBtn.disabled = false
    }
  }

const questionBtn = document.getElementById('question-btn')
const diffDice = document.getElementById('diffDice');

questionBtn.addEventListener('click', (e) => {
    if (!isFetchingQuestion && !questionBtn.disabled) {

    diffDice.className = '';
    diffDice.classList.add('spin-dice');
    isFetchingQuestion = true

    e.preventDefault();
    const dice2 = rollDice();
    let questionType = "";
    
    setTimeout(function(){
        diffDice.classList.remove('spin-dice');

        switch(dice2){
            case 1:
                diffDice.classList.add('one-dice');
                questionType = "easy";
                break;
            case 2:
                diffDice.classList.add('two-dice');
                questionType = "easy";
                break;
            case 3:
                diffDice.classList.add('three-dice');
                questionType = "medium";
                break;
            case 4:
                diffDice.classList.add('four-dice');
                questionType = "medium";
                break;
            case 5:
                diffDice.classList.add('five-dice');
                questionType = "hard";
                break;
            case 6:
                diffDice.classList.add('six-dice');
                questionType = "hard";
                break;     
        }   

        fetch(`http://localhost:3000/countries/random/${questionType}`)
        .then((response) => { 
            if(!response.ok) {
                throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then((data) => {
             const image = data.imageUrl;
             const correctCountry = data.country;
             displayQuestionModal(image, correctCountry);
             diceBtn.disabled = false
             questionBtn.disabled = true
             canRollDice = true
             isFetchingQuestion = false
        })
        .catch((error) => {
            console.error("Error fetching question: ", error)
            diceBtn.disabled = false
            questionBtn.disabled = true
            canRollDice = true
            isFetchingQuestion = false
            });
        }, 2000)
      }
    })
})


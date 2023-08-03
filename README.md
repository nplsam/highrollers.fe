# High-Rollers

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## [Live Site](https://high-rollers.onrender.com/)
## About the project
- High-Rollers is a web app designed to foster curiosity for geography. It was developed with education in mind, whilst still maintaining a focus on play.

- Players roll dice, then answer questions that test their knowledge of the world. They move forwards if correct, and win by progressing to the end of the board.

- High Rollers is in its early stages, and many more features + questions will be added to the application in due course. Please see the Contribution Guide below if you want to help!

## Installation for the Client Side
- Clone the [Client Side Repo](https://github.com/nplsam/highrollers.fe)
- `cd` into the client folder.
- `npm i` to install all the necessary packages.
- Open index.html with the browser of your choice to see the app running. 
- If changes are made to the code, run npm run dev to bundle all changes.

## Installation for the Server Side
- Clone the [Server Side Repo](https://github.com/nplsam/highrollers.be)
- `cd` into server
- `npm i` to install all the necessary packages.
- `npm run dev` to start the server.
- test endpoints by appending queries to localhost:3000


## Process

- Started by hashing out a basic idea of the application
- We then created layout concepts, as well as how the game screen would look.

- Created Grid object which would create and populate a grid. The whole application is structured through the grid object

```js
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
```

- When running, this object renders the grid with the HTML Canvas element.

![Grid Screenshot](/client/assets/Images/Screenshot%202023-08-03%20at%2016.20.42.png)

- We then created a backend web service to service fetch requests from our client. This included links to images and the country object to provide data.

- After adding the Javascript to handle the game logic, we then polished our CSS to improve the look of the site.


## Wins and Challenges

- Utilising Cloudinary to create links to images that our API could host saved us a lot of programming time that was spent on core features.

- Utilising an Object Oriented approach allowed us to tightly link the elements of the game.

- We decided on the look of our app at the start, which allowed us to have consistent branding throughout.

- Our attitude towards the time constraint was positive throughout, and we always had a clear plan to stay on track.

- We were challenged at times by git merge conflicts which took some careful communication to resolve.

- We were challenged by the necessity to understand each others code. In particular the classes which make up the game. At first glance they are imposing to understand.

- We were challenged by the process to deploy our website. We had issues with the build command on render but slight refactoring allowed us to clean up this problem.

## Bugs

- There are some black spaces that appear when the grid and API images are being loaded. In the future these will be replaced with a loading icon.


## Future Features

- We intend to add local and online multiplayer, so that students can play against each other in the classroom and at home.

- We intend to add profile creation so that students can view their head to head results against each other, and to enable online matchmaking.

- We intend to expand our database of questions.


## Contribution Guide

- Fork either repo.
- Make changes, ideally one feature at a time
- Create a pull request with a descriptive message explaining your contribution. 
## Technologies

- We used the following technologies to create High-Rollers:

- Languages:  

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

- Design:  

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

- FrameWorks, Platforms and Libraries:  

![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)

- Hosting:  

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

- IDE:  

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Authors

[EndlessEndless1999](https://github.com/EndlessEndless1999)

[nplsam](https://github.com/nplsam)

[salinathapa](https://github.com/salinathapa)
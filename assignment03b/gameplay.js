let cells = []; // declare and initalize
let cols = 10;
let rows = 10;
let difficulty;
let game_state = 0;
let pts = 0;
let fires = [];
let robot_sheet;
let robot;
let firepng;
let firewhoosh;
let gameover;

document.addEventListener('DOMContentLoaded', () => {
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', function() {
    if (this.id === "teleportButton" && !this.disabled) { //if tp button is clicked and only allow tp if enabled
      teleportRobot();
      this.disabled = true;  // disable tp button
      setTimeout(() => {
          this.disabled = false;  // enable after 15s
      }, 15000);
    } else if (this.id === "resetButton") { // if reset is clicked
      resetGame(); // call reset
    } else { // any other button (difficulty select)
      difficulty = this.id; // set difficulty based on button ID
      game_state = 1; // set game_state to 1
      startGame(); // call start
    }
  });
  function startGame() {
    let highScore = localStorage.getItem('highScore') || 0;
    const highScoreElement = document.getElementById('highScoreDisplay');
    if (highScoreElement) {
        highScoreElement.innerText = 'High Score: ' + highScore;
    }

    document.getElementById('startScreen').style.display = 'none'; // Hide start screen
    let canvasDiv = document.getElementById('container');
    canvasDiv.style.display = 'flex'; // Show the game
    const gameButtons = document.getElementById('gameButtons');
    if (gameButtons) {
        gameButtons.style.display = 'block'; // Show the game buttons
    }

    // Move event listeners to startGame or setup, not p.draw
    const teleportButton = document.getElementById('teleportButton');
    if (teleportButton) {
        teleportButton.addEventListener('click', function() {
            teleportRobot();
        });
    }

    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            resetGame();
        });
    }

    console.log("Difficulty:", difficulty);

    if (!window.mazeInstance || !window.gameplayInstance) {
        window.mazeInstance = new p5(maze, 'mazeCanvas');
        window.gameplayInstance = new p5(gameplay, 'gameplayCanvas');
    }
}



function teleportRobot() { // randomly teleport robot
    let randomRow = Math.floor(Math.random() * rows);
    let randomCol = Math.floor(Math.random() * cols);
    robot.row = randomRow;
    robot.col = randomCol;
    robot.x = robot.col * 40;  
    robot.y = robot.row * 40;
}

function resetGame() {
    let highScore = localStorage.getItem('highScore') || 0; // pull high score
    if (pts > highScore) { // if pts is greates
        localStorage.setItem('highScore', pts); // update highscore
        highScore = pts;
    }
    // set state to 0
    game_state = 0;
    pts = 0; // reset pts
    fires = []; // reset fires
    cells = []; // reset cells
    robot = null; // reinitialize robot

    // hide game and show start screen
    document.getElementById('pts').innerText = 'Points: 0';
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameButtons').style.display = 'none';
    document.getElementById('gameOverMessage').style.display = 'none';

    // reset p5 instances 
    if (window.mazeInstance) { 
        window.mazeInstance.remove();
        window.mazeInstance = null;
    }
    if (window.gameplayInstance) {
        window.gameplayInstance.remove();
        window.gameplayInstance = null;
    }

}
});

let maze = function(p) {
  let cellSize = 40
  let mazebg;
  p.preload = function() {
    mazebg = p.loadImage("assets/mazebg.jpg") // load maze bg
  }
  p.setup = function() {
    let canvas1 = p.createCanvas(400, 400);
    canvas1.parent('mazeCanvas');
    p.background(120);
    for (let i = 0; i < cols; i++) {
      cells[i] = [];
      for (let j = 0; j < rows; j++) {
        cells[i][j] = new Cell(i, j, cellSize, p); // create cols*rows amount of cells
      }
    }
    let startCol = Math.floor(p.random(cols)); // choose a random cell
    let startRow = Math.floor(p.random(rows));
    cells[startRow][startCol].dfs(); // begin dfs from there
  }
  p.draw = function() {
    p.image(mazebg, 0, 0); // draw bg
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        cells[i][j].display(); // display all cells
      }
    }
    p.noFill();
    p.stroke(0);
    p.strokeWeight(10);
    p.rect(0, 0, 400, 400); // border
  }

  class Cell {
    constructor(row, col, w, p) {
      this.p = p;
      this.row = row;
      this.col = col;
      this.w = w;
      this.visited = false;
      this.lines = [1, 1, 1, 1]; // each cell has 4 walls, this list decides which walls are enabled, 1=enabled, 0=disabled
    }
    display() {
      let x = this.col * this.w; // find x and y because we will use a grid system
      let y = this.row * this.w;
      p.strokeWeight(5);
      p.stroke(230, 200, 120);
      if (this.lines[0] === 1) { // if wall is enabled, draw it
        p.line(x, y, x + this.w, y);
      }
      if (this.lines[1] === 1) {
        p.line(x + this.w, y, x + this.w, y + this.w);
      }
      if (this.lines[2] === 1) {
        p.line(x, y + this.w, x + this.w, y + this.w);
      }
      if (this.lines[3] === 1) {
        p.line(x, y, x, y + this.w);
      }
    }
    unvisitedNeighbors() {
      let neighbor = [];
      let top = this.row > 0 ? cells[this.row - 1][this.col] : undefined; // if current cell isnt in the top-most row get the cell above it
      let right = this.col < cols - 1 ? cells[this.row][this.col + 1] : undefined; // if current cell isnt in the right-most column get the cell to its right
      let bottom = this.row < rows - 1 ? cells[this.row + 1][this.col] : undefined; // if current cell isnt in the bottom-most row get the cell under it
      let left = this.col > 0 ? cells[this.row][this.col - 1] : undefined; // if current cell isnt in the left-most column get the cell to its right

      if (top && !top.visited) { neighbor.push(top) } // if unvisited push to neighbors array
      if (right && !right.visited) { neighbor.push(right) }
      if (bottom && !bottom.visited) { neighbor.push(bottom) }
      if (left && !left.visited) { neighbor.push(left) }

      return neighbor.length > 0 ? neighbor[Math.floor(p.random(neighbor.length))] : undefined; // return a random neighboring cell
    }
    dfs() {
      this.visited = true; // set visited to true
      let next = this.unvisitedNeighbors(); // find next
      while (next) { // while next exists
        this.removeWall(next); // remove the wall between current and next
        next.dfs(); // recuse dfs
        next = this.unvisitedNeighbors(); // get next
      }
    }
    removeWall(next) {
      if (this.col < next.col) { // check where the neighboring cell and remove both walls from each cell (ex. right wall of current cell and left wall of next cell, if next is to the right of current)
        this.lines[1] = 0;
        next.lines[3] = 0;
      } else if (this.col > next.col) {
        this.lines[3] = 0;
        next.lines[1] = 0;
      }
      if (this.row < next.row) {
        this.lines[2] = 0;
        next.lines[0] = 0;
      } else if (this.row > next.row) {
        this.lines[0] = 0;
        next.lines[2] = 0;
      }
    }
  }
}



let gameplay=function(p){
    p.preload = function (){ // load asets
        robot_sheet=p.loadImage("assets/robot.png")
        robotbg=p.loadImage("assets/robotpg.png")
        firepng=p.loadImage("assets/fire.png")
        firewhoosh=p.loadSound("assets/fire-whoosh.mp3")
        gameover=p.loadSound("assets/gameover.mp3")
        
    }
    p.setup = function() {
        let canvas2 = p.createCanvas(400, 400);
        canvas2.parent('gameplayCanvas');
        p.image(robotbg,0,0,400,400)
        robot = new player();
        for (let i = 0; i < Number(difficulty); i++) {
            let col = Math.floor(p.random(cols));
            let row = Math.floor(p.random(rows));
            fires.push(new Fire(row, col)); // create fires randomly (number depending on difficulty)
        }
    };
        
p.draw = function () {
    if (game_state === 1) { // if game is started
        p.image(robotbg, 0, 0, 400, 400);
        robot.display();
        fires.forEach(fire => {
            fire.display();
        });
        p.extinguishFire();
    }
    document.getElementById('pts').innerText = 'Points: ' + pts; // for writing amount of pts to html

};


class player{
    constructor(){
        this.x=0;
        this.y=0;
        this.col=0;
        this.row=0;
        this.direction=1;
        this.keyHandled=false;
    }
    display(){ // orientation display
        if (this.direction == 0){
        p.image(robot_sheet,this.x,this.y,44,40,0,0,44,40)
        }
        else if(this.direction == 1){
        p.image(robot_sheet,this.x,this.y,44,40,0,81,44,40)
        }
        else if(this.direction == 2){
        p.image(robot_sheet,this.x,this.y,44,40,0,41,44,40)
        }
        else if(this.direction == 3){
        p.image(robot_sheet,this.x,this.y,44,40,0,120,44,40)
        }
        
        }

    }
    p.keyPressed = function() {
        // only move if the key has not been handled yet
        if (game_state===1){
        if (!robot.keyHandled) {
            if ((p.key === 's' || p.key === 'S') && robot.row < rows-1) { 
                if (cells[robot.row][robot.col].lines[2]==0){  // check if a wall doesnt exist
                    robot.y+=40; // move robot
                    robot.row++; // update its row
                    robot.direction=2 // update its sprite based on direction
                }
                else{ // if wall exists
                    p.lose() // call lose
                }
            } else if ((p.key === 'w' || p.key === 'W') && robot.row > 0) {
                if (cells[robot.row][robot.col].lines[0]==0){
                robot.y-=40;
                robot.row--;
                robot.direction=0
                }
                else{
                    p.lose()
                }
            } else if ((p.key === 'a' || p.key === 'A') && robot.col > 0) {
                if (cells[robot.row][robot.col].lines[3]==0){
                    robot.x-=40;
                    robot.col--
                    robot.direction=1
                }
                else{
                    p.lose()
                }
            } else if ((p.key === 'd' || p.key === 'D') && robot.col < cols-1) {
                if (cells[robot.row][robot.col].lines[1]==0){
                    robot.x+=40;
                    robot.col++
                    robot.direction=3
                }
                else{
                    p.lose()
                }
            }
            robot.keyHandled = true; // set to true after handling
        }
    }
    };


    p.extinguishFire=function(){
        for (let i=0;i<fires.length; i++){ // check all fires
            if (robot.col==fires[i].row && robot.row==fires[i].col){ // if robot occupies same grip as a fire
                pts++; // icnrement pts
                fires[i].ticks=0; // reset fire ticks
                fires[i].col = Math.floor(p.random(cols)); // move fire to a new location
                fires[i].row = Math.floor(p.random(rows));
                firewhoosh.play(); // play sound
            }
        }
    }
    p.keyReleased = function() {
        robot.keyHandled = false; // set to false after key is released, to avoid holding down movement buttons

    };

    p.lose = function() {
        const gameOverMessage = document.getElementById('gameOverMessage');
        if (gameOverMessage) {
            gameOverMessage.style.display = 'block';
        }
    
        robot.x = 0;
        robot.row = 0;
        robot.y = 0;
        robot.col = 0;
    
        game_state = 0;
        gameover.play();
    
        let highScore = parseInt(localStorage.getItem('highScore') || 0);
        if (pts > highScore) {
            localStorage.setItem('highScore', pts);
            highScore = pts;
        }
    
        const highScoreElement = document.getElementById('highScoreDisplay');
        if (highScoreElement) {
            highScoreElement.innerText = 'High Score: ' + highScore;
        }
    };


    class Fire{
        constructor(row,col){
            this.x=row*40
            this.y=col*40;
            this.row=row;
            this.col=col;
            this.frame = 0; 
            this.timer = 3000;
            this.lifespan=40; 
            this.ticks=0;
            firewhoosh.play(); // play sound when game begins
        }
        display() {
            this.x=this.row*40;
            this.y=this.col*40;
            let frameWidth = 64; // tried to center fires on grids because I scaled the image size but this is the best i can do
            let frameHeight = 64;
            let scaledWidth = frameWidth * 2
            let scaledHeight = frameHeight * 2
            let offsetX = (scaledWidth - frameWidth) / 1.5
            let offsetY = (scaledHeight - frameHeight) / 1.5
            p.image(firepng, this.x - offsetX, this.y - offsetY, scaledWidth, scaledHeight, frameWidth * this.frame, 0, frameWidth, frameHeight);
            this.updateFrame();
        }
        updateFrame() { // fire ticker update and image
            this.ticks++; // increment ticks
            if (this.ticks % 10 === 0) { // every 10 framed
                this.frame = (this.frame + 1) % 4; // update frame
            }
            if (this.ticks >= this.lifespan*60) { // if ticks reach lifespan*60
                p.lose(); // call lose
            }
        }
        }
}

});
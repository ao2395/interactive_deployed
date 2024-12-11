let handPose;
let capture;
let hands = [];
let currentBlock;
let blockSize = 40;
let cols = 15;
let rows = 13;
let gameOver=0
let grid = []; // grid color array of placed blocks
let points=0

let shapes = [
  [[1], [1], [1]],           // Long bar
  [[1, 1], [1, 1]],          // Square
  [[0, 1, 0], [1, 1, 1]],    // T shape         The length of these arrays and the zeros help us find the hitbox of the blocks
  [[1, 0, 0], [1, 1, 1]],    // L shape
  [[0, 0, 1], [1, 1, 1]]     // Opposite L shape
];

let colors = ['red', 'blue', 'green', 'yellow', 'purple']; //colors (same length as shapes to match colors to shapes)

function preload() {
  handPose = ml5.handPose(); // load handpose
}

function setup() {
  createCanvas(cols * blockSize, rows * blockSize); // create canvas according to grid size

  capture = createCapture({ // create capture
    video: {
        mandatory: {
            minWidth: cols * blockSize,
            minHeight: rows * blockSize,
            maxWidth: cols * blockSize,
            maxHeight: rows * blockSize
        }
    },
    audio: false
});
capture.hide();
for (let i = 0; i < rows; i++) { // initalize grid with zeros
    grid[i] = []; 
    for (let j = 0; j < cols; j++) {
        grid[i][j] = 0; 
    }
}
  handPose.detectStart(capture, gotHands); // start detecting
  spawnBlock(); // spawn first block
}

function draw() {
  background(220);
    if (gameOver==0){ // if game state is on going 
  push();
  translate(width, 0);
  scale(-1, 1); // invert the camera
  image(capture, 0, 0, width, height);
  pop();
  if (hands.length > 0 && currentBlock) { // if there is a hand and current block
    let keypoints = hands[0].keypoints;  // get all points on the hand
    let totalX = 0; // total x cords
    for (let i = 0; i < keypoints.length; i++) { // add up all the x cords
      totalX += keypoints[i].x;
    }
    let midpointX = totalX / keypoints.length; // get the midpoint (more points rather than one figher, hopefully more accurate)
    let handX = width - midpointX; // camera is inverted so invert the x position of your hand
    let col = constrain(floor(handX / blockSize), 0, cols - currentBlock.shape[0].length); // find the column the hand's X posiiton is in and constrain it between 0 and the chosen shapes length
    currentBlock.x = col * blockSize; // set x;
}

  if (currentBlock) { // if there is a current block
    currentBlock.display(); // call display

    if (frameCount % 30 === 0) { // every 30 frames run the code
      let nextY = currentBlock.y + blockSize; // get next block position
      if (collides(currentBlock.x, nextY, currentBlock.shape)) { // if it collides
        placeBlock(currentBlock); // place the block there
        clearFullLines(); // call clear full lines
        spawnBlock(); // and spawn new block
      } else {
        currentBlock.y = nextY; // if no collision just move the block down;
      }
    }
  }

  drawGrid(); // call drawgrid which draws all placed blocks
}
else{ // if game is over
    background(255,0,0) // set background to red and display game over 
    fill(255)
    textSize(50)
    text("GAME OVER",width/4,height/2)
}
}


function drawGrid() {
  for (let y = 0; y < rows; y++) { // go through grid array
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] != 0) { // if not 0
        fill(grid[y][x]); // fill with color in grid array
        rect(x * blockSize, y * blockSize, blockSize, blockSize); // render block 
      }
    }
  }
}

function collides(x, y, shape) {
  let gridX = floor(x / blockSize); // get row and col of block
  let gridY = floor(y / blockSize);

  for (let i = 0; i < shape.length; i++) { // go through shapes array
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] == 1) {  // if there is a "piece" there
        let newY = gridY + i; // check newY and newX
        let newX = gridX + j;
        if (newY >= rows || grid[newY][newX] !== 0) { // if we hit the floor or a block is found
          return true; // return true
        }
      }
    }
  }
  return false; // return false
}

function placeBlock(block) {
  let gridX = floor(block.x / blockSize); // get row and col of block
  let gridY = floor(block.y / blockSize);

  for (let i = 0; i < block.shape.length; i++) {  // go through shape array of respective block
    for (let j = 0; j < block.shape[i].length; j++) {
      if (block.shape[i][j] == 1) { // if a spot is 1
        grid[gridY + i][gridX + j] = block.color; // color the respective block in the subspace of the grid array
      }
    }
  }
}

function spawnBlock() {
  let index = floor(random(shapes.length)); // chose random index 
  currentBlock = new Block(shapes[index], colors[index], floor(cols / 2) * blockSize, 0);
    // create new block in the middle at the top with a color matching the shape
  if (collides(currentBlock.x, currentBlock.y, currentBlock.shape)) { // if it instantly collides then game is lost
    gameOver=1
  }
}

function clearFullLines() {
  for (let y = rows - 1; y >= 0; y--) { // go through rows bottom up
    let isFull = true; 

    for (let x = 0; x < grid[y].length; x++) { // go through cells of row
        if (grid[y][x] == 0) { // if a 0 is found
            isFull = false; // set to false and break
            break;        
         }
    }
    if (isFull){
      grid.splice(y, 1); // remove the full row
      grid.unshift(Array(cols).fill(0)); // add a new row at the top filled with zeros
      y++; // increment y to maintain loop integrity
      points+=10 // update pts
      document.getElementById('points').innerText = `Points: ${points}` // update pts on the html
    }
  }
}

class Block {
  constructor(shape, color, x, y) {
    this.shape = shape;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  display() {
    fill(this.color); 
    noStroke();
    for (let i = 0; i < this.shape.length; i++) { // run through the respective shape array
      for (let j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j] === 1) { // if a 1 exists
          rect(this.x + j * blockSize, this.y + i * blockSize, blockSize, blockSize); // draw a block
        }
      }
    }
  }
}

function gotHands(results) {
  hands = results;
}

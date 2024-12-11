let arrowUp, arrowDown, arrowLeft, arrowRight;
let arrow;

function preload() {
    arrowUp = loadImage('images/arrow_up.png');
    arrowDown = loadImage('images/arrow_down.png');
    arrowLeft = loadImage('images/arrow_left.png');
    arrowRight = loadImage('images/arrow_right.png');
}

class Arrow {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = ["up", "right", "down", "left"];
        this.directionIndex = floor(random(this.directions.length));
        this.direction = this.directions[this.directionIndex];
    }

    display() {
        let img;
        if (this.direction == "up") {
            img = arrowUp;
        }
        else if (this.direction == "right") {
            img = arrowRight;
        }
        else if (this.direction == "left") {
            img = arrowLeft
        }
        else {
            img = arrowDown
        }
        imageMode(CENTER);
        image(img, this.x, this.y);
    }

    checkClick() {
        if (mouseX > this.x - 20 && mouseX < this.x + 20 && mouseY > this.y - 20 && mouseY < this.y + 20) {
            this.directionIndex = (this.directionIndex + 1) % this.directions.length;
            this.direction = this.directions[this.directionIndex];
        }
    }
}

function setup() {
    createCanvas(800, 600);
    arrow = new Arrow(width / 2, height / 2);
}

function draw() {
    background(220);
    arrow.display();
}

function mousePressed() {
    arrow.checkClick();
}

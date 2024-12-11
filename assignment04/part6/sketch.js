let arrowUp, arrowDown, arrowLeft, arrowRight;
let arrows = [];
let robots = [];
let frameCount = -1;

function preload() {
    arrowUp = loadImage('images/arrow_up.png');
    arrowDown = loadImage('images/arrow_down.png');
    arrowLeft = loadImage('images/arrow_left.png');
    arrowRight = loadImage('images/arrow_right.png');
}

function setup() {
    createCanvas(800, 600);
    let xSpacing = width / 7;
    let ySpacing = height / 7;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            let x = xSpacing * i + xSpacing / 2;
            let y = ySpacing * j + ySpacing / 2;
            arrows.push(new Arrow(x, y));
        }
    }
}

function draw() {
    background(100);
    for (let arrow of arrows) {
        arrow.display();
    }
    frameCount++;
    if (frameCount % 120 == 0) {
        robots.push(new Robot(0, (height / 2) - 30, "right"));
    }
    for (let robot of robots) {
        robot.display();
        robot.move();
    }
    for (let i = robots.length - 1; i >= 0; i--) {
        robots[i].display();
        robots[i].move();

        if (
            robots[i].x < -100 || robots[i].x > width + 100 ||
            robots[i].y < -100 || robots[i].y > height + 100
        ) {
            robots.splice(i, 1);
        }
    }
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
        if (this.direction == "up") img = arrowUp;
        else if (this.direction == "right") img = arrowRight;
        else if (this.direction == "left") img = arrowLeft;
        else img = arrowDown;
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

function mousePressed() {
    for (let arrow of arrows) {
        arrow.checkClick();
    }
}

class Robot {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.headColor = color(255, random(255), random(255));
        this.bodyColor = color(0, random(255), random(255));
        this.headSize = random(15, 30);
        this.bodySize = this.headSize + random(15, 25);
        this.eyeType = random([0, 1]);
        this.direction = direction;
        this.speed = 1;
        this.alpha = 255;
        this.alphaflag = false;
    }

    display() {
        if (this.alpha > 255) this.alphaflag = false;
        if (this.alpha < 80) this.alphaflag = true;
        this.alphaflag ? this.alpha += 2 : this.alpha -= 2;

        rectMode(CENTER);
        fill(255, 255, 0, this.alpha);
        if (this.direction == "right") ellipse(this.x - this.bodySize / 2, this.y + this.bodySize / 2 + this.headSize, 12, 12);
        else if (this.direction == "left") ellipse(this.x + this.bodySize / 2, this.y + this.bodySize / 2 + this.headSize, 12, 12);
        else if (this.direction == "up") ellipse(this.x, this.y + this.bodySize + this.headSize / 2, 12, 12);
        else if (this.direction == "down") ellipse(this.x, this.y - this.headSize / 2, 12, 12);

        fill(this.headColor);
        rect(this.x, this.y, this.headSize, this.headSize);

        fill(this.bodyColor);
        rect(this.x, this.y + this.headSize / 2 + this.bodySize / 2, this.bodySize, this.bodySize);

        fill(255);
        if (this.eyeType) {
            rect(this.x - this.headSize / 3.5, this.y - this.headSize / 3.5, this.headSize / 8, this.headSize / 5);
            rect(this.x + this.headSize / 3.5, this.y - this.headSize / 3.5, this.headSize / 8, this.headSize / 5);
        } else {
            rect(this.x + this.headSize / 30, this.y - this.headSize / 5, 7 * this.headSize / 10, this.headSize / 5);
        }
    }

    move() {
        for (let arrow of arrows) {
            if (dist(this.x, this.y + 30, arrow.x, arrow.y) < 20) {
                this.direction = arrow.direction;
            }
        }
        if (this.direction == "right") this.x += this.speed;
        else if (this.direction == "left") this.x -= this.speed;
        else if (this.direction == "up") this.y -= this.speed;
        else if (this.direction == "down") this.y += this.speed;
    }
}
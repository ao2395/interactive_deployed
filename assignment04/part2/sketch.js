let temp;
function setup() {
    createCanvas(800, 600);
    temp = new Robot(width / 3, height / 2, "right");
    temp1 = new Robot(2 * width / 3, height / 2, "left");
    temp2 = new Robot(width / 2, 2 * height / 3, "up");
    temp3 = new Robot(width / 2, height / 3, "down");
    background(0);
}
function draw() {
    background(0)
    temp.display();
    temp1.display();
    temp2.display();
    temp3.display();
    temp.move();
    temp1.move();
    temp2.move();
    temp3.move();
}
class Robot {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.headColor = color(255, random(255), random(255));
        this.bodyColor = color(0, random(255), random(255));
        this.headSize = random(25, 50);
        this.bodySize = this.headSize + random(30, 45);
        this.eyeType = random([0, 1]);
        this.direction = direction
        this.speed = 1;
        this.alpha = 255;
        this.alphaflag = false;
    }
    display() {
        if (this.alpha > 255) {
            this.alphaflag = false
        }
        if (this.alpha < 120) {
            this.alphaflag = true;
        }
        this.alphaflag ? this.alpha += 1 : this.alpha -= 1;
        rectMode(CENTER);
        if (this.direction == "right") {
            fill(255, 255, 0, this.alpha);
            ellipse(this.x - this.bodySize / 2, this.y + this.bodySize / 2 + this.headSize, 20, 20);
        }
        if (this.direction == "left") {
            fill(255, 255, 0, this.alpha);
            ellipse(this.x + this.bodySize / 2, this.y + this.bodySize / 2 + this.headSize, 20, 20);
        }
        if (this.direction == "up") {
            fill(255, 255, 0, this.alpha);
            ellipse(this.x, this.y + this.bodySize + this.headSize / 2, 20, 20);
        }
        if (this.direction == "down") {
            fill(255, 255, 0, this.alpha);
            ellipse(this.x, this.y - this.headSize / 2, 20, 20);
        }
        fill(this.headColor);
        rect(this.x, this.y, this.headSize, this.headSize);
        fill(this.bodyColor);
        rect(this.x, this.y + this.headSize / 2 + this.bodySize / 2, this.bodySize, this.bodySize);
        fill(255);
        rectMode(CENTER);
        if (this.eyeType) {
            rect(this.x - this.headSize / 3.5, this.y - this.headSize / 3.5, this.headSize / 8, this.headSize / 5);
            rect(this.x + this.headSize / 3.5, this.y - this.headSize / 3.5, this.headSize / 8, this.headSize / 5);
        }
        else {
            rect(this.x + this.headSize / 30, this.y - this.headSize / 5, 7 * this.headSize / 10, this.headSize / 5);
        }
    }
    move() {
        if (this.direction == "right") {
            this.x += this.speed;
        }
        if (this.direction == "left") {
            this.x -= this.speed;
        }
        if (this.direction == "up") {
            this.y -= this.speed;
        }
        if (this.direction == "down") {
            this.y += this.speed;
        }
    }
}
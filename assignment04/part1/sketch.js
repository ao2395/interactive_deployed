function setup() {
    createCanvas(800, 600);
    let temp = new Robot(width / 2, height / 2);
    background(0);
    temp.display();
}
function draw() {

}
class Robot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.headColor = color(255, random(255), random(255));
        this.bodyColor = color(0, random(255), random(255));
        this.headSize = random(25, 50);
        this.bodySize = this.headSize + random(30, 45);
        this.eyeType = random([0, 1]);
    }
    display() {
        rectMode(CENTER);
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
}
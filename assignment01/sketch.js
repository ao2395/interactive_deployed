function setup(){
  createCanvas(480,640)
  rect(0,0,480,640)
  // Red 255,0,0
  // Brown 117,104,0
  // Light-Brown 255,178,0
  noStroke()
  fill(255,0,0)
  // Layer 1
  for (let x=120;x<281;x=x+40){
    rect(x,0,40,40)
  }
  // Layer 2
  for(let x=80; x<401;x=x+40){
    rect(x,40,40,40)
  }
  // Layer 3
  fill(117,104,0)
  rect(80,80,40,40)
  rect(120,80,40,40)
  rect(160,80,40,40)
  fill(255,178,0)
  rect(200,80,40,40)
  rect(240,80,40,40)
  rect(320,80,40,40)
  fill(117,104,0)
  rect(280,80,40,40)
  // Layer 4
  rect(40,120,40,40)
  rect(120,120,40,40)
  fill(255,178,0)
  rect(80,120,40,40)
  rect(160,120,40,40)
  rect(200,120,40,40)
  rect(240,120,40,40)
  rect(320,120,40,40)
  rect(360,120,40,40)
  rect(400,120,40,40)
  fill(117,104,0)
  rect(280,120,40,40)
  // Layer 5
  rect(40,160,40,40)
  rect(120,160,40,40)
  rect(160,160,40,40)
  rect(320,160,40,40)
  fill(255,178,0)
  rect(200,160,40,40)
  rect(80,160,40,40)
  rect(240,160,40,40)
  rect(280,160,40,40)
  rect(360,160,40,40)
  rect(400,160,40,40)
  rect(440,160,40,40)
  // Layer 6
  fill(117,104,0)
  rect(40,200,40,40)
  rect(80,200,40,40)
  rect(280,200,40,40)
  rect(320,200,40,40)
  rect(340,200,40,40)
  rect(380,200,40,40)
  fill(255,178,0)
  for (let x=120;x<241;x=x+40){
    rect(x,200,40,40)
  }
  // Layer 7
  for (let x=120;x<361;x=x+40){
    rect(x,240,40,40)
  }
  // Layer 8
  for (let x=80; x<281;x=x+40){
    fill(117,104,0)
    rect(x,280,40,40)
  }
  fill(255,0,0)
  rect(160,280,40,40)
  // Layer 9
  fill(117,104,0)
  for (let x=40;x<439;x=x+40){
    rect(x,320,40,40)
  }
  fill(255,0,0)
  rect(160,320,40,40)
  rect(280,320,40,40)
  // Layer 10
  fill(117,104,0)
  for (let x=0; x<441;x=x+40){
    rect(x,360,40,40)
  }
  fill(255,0,0)
  for (let x=160;x<281;x=x+40){
    rect(x,360,40,40)
  }
  fill(255,178,0)
  for (let x=0; x<441;x=x+40){
    rect(x,400,40,40)
  }
  fill(255,0,0)
  rect(120,400,40,40)
  rect(200,400,40,40)
  rect(240,400,40,40)
  rect(320,400,40,40)
  fill(117,104,0)
  rect(80,400,40,40)
  rect(360,400,40,40)
  // Layer 11
  fill(255,178,0)
  for (let x=0; x<441; x=x+40){
    rect(x,440,40,40)
  }
  fill(255,0,0)
  for (let x=120;x<360;x=x+40){
    rect(x,440,40,40)
  }
  // Layer 11
  fill(255,178,0)
  for (let x=0; x<441; x=x+40){
    rect(x,480,40,40)
  }
  fill(255,0,0)
  for (let x=80;x<400;x=x+40){
    rect(x,480,40,40)
  }
  // Layer 12
  for (let x=80;x<200;x=x+40){
    rect(x,520,40,40)
  }
  for (let x=280;x<400;x=x+40){
    rect(x,520,40,40)
  }
  // Layer 13
  fill(117,104,0)
  for (let x=40;x<160;x=x+40){
    rect(x,560,40,40)
  }
  for (let x=320;x<440;x=x+40){
    rect(x,560,40,40)
  }
  // Layer 14
  fill(117,104,0)
  for (let x=0;x<160;x=x+40){
    rect(x,600,40,40)
  }
  for (let x=320;x<480;x=x+40){
    rect(x,600,40,40)
  }
}
// variable to hold a reference to our A-Frame world
let world;
let portalarr=[]
let collectables=[0,0,0,0,0]
let collectablesContainer;
let coin;
let coinpng;
let graphics
let mugpng
let mugClicker
let mug
let cylinder
let platformContainer
let p1;
let p2;
let p3;
let platform;
let platformTrack1;
let platformTrack2;
let platformTrack3;
let platformTrack4;
let floatingPlatform1;
let floatingPlatform2;
let floatingPlatform3;
let floatingPlatform4;
let torusKnot;
let torus; 
let dnite
let dniteClicker
let dnitepng;
let floorCanvas
let floorTexture
let groudon
let groudonClicker
let groudonpng
let startText;
function preload(){
    coinpng = loadImage("images/coin1.png")
    mugpng =loadImage("images/subject.png")
    torus=loadImage("images/torus.png")
    dnitepng=loadImage("images/dnite.png")
    groudonpng= loadImage('images/groudon.png')
}
function setup() {
    // no canvas needed
    noCanvas();
    // construct the A-Frame world
    // this function requires a reference to the ID of the 'a-scene' tag in our HTML document
    world = new AFrameP5.World('VRScene');
    world.setFlying(false);
    let sky = new AFrameP5.Sky({ // ruins background
        asset: 'wallpaper',
        radius:100
    });
    floorCanvas = createGraphics(512, 512) // dynamic textured floor with footsteps in the sand
    floorCanvas.background(194,178,128)
    floorTexture = world.createDynamicTextureFromCreateGraphics(floorCanvas);
    world.add(sky)
    let floor = new AFrameP5.Plane({
        x:0,
        y:0,
        z:0,
        width:30,
        height:30,
        rotationX:-90,
        side:'double',
        dynamicTexture: true,
        asset:floorTexture,
        dynamicTextureWidth: 512,
        dynamicTextureHeight: 512,

    })
    startText = new AFrameP5.Text({ // starting text
        text: "Welcome!!\n Your objective is to search for artifacts and pokemon in these desert ruins\n You can pick up pokemon or artifacts by getting close and clicking them\n There are also portals around which if you get close to and click will pull you in and teleport you to a portal of the complementary color\n You are affected by gravity unless you stand on a valid platform",
        x: 0,
        y:1.7,
        z:2.05,
        red:0,
        green:0,
        blue:0,
        font:'exo2bold',
        scaleX:5,
        scaleY:5,
        scaleZ:5
    })
    world.add(startText)
    let floor2 = new AFrameP5.Plane({ // underground
        x:0,
        y:-20,
        z:0,
        width:30,
        height:30,
        rotationX:-90,
        side:'double',
        red:194,
        green:178,
        blue:128

    })
    let wall1 = new AFrameP5.Plane({ // walls indicating end of map
        green:168,
        red:194,
        blue:140,
        x:15,
        y:-20,
        z:0,
        width:30,
        height:42,
        rotationY:-90

    })
    let wall2 = new AFrameP5.Plane({
        green:168,
        red:194,
        blue:140,
        x:-15,
        y:-20,
        z:0,
        width:30,
        height:42,
        rotationY:90

    })
    let wall3 = new AFrameP5.Plane({
        green:168,
        red:194,
        blue:140,
        x:0,
        y:-20,
        z:15,
        width:30,
        height:42,
        rotationX:-180

    })
    let wall4 = new AFrameP5.Plane({
        green:168,
        red:194,
        blue:140,
        x:0,
        y:-20,
        z:-15,
        width:30,
        height:42,


    })
    world.add(wall1) 
    world.add(wall2) 
    world.add(wall3) 
    world.add(wall4)
    world.add(floor)
    world.add(floor2)
    platformContainer= new AFrameP5.Container3D({ // container for spinning platform
        x:0,
        y:1.5,
        z:0,
    });
    cylinder=new AFrameP5.Cylinder({ // cylinder of platform
        radius:2,
        height:15,
        red:28,
        green:163,
        blue:236,

    });
    platform = new AFrameP5.Box({ // platform
        x:0,
        y:7,
        z:0,
        height:25,
        width:5,
        red:28,
        green:163,
        blue:236,
        rotationX:90,
        side:'double'
    })
    platformTrack1=new AFrameP5.Cone({ // cones at edge of platform (used to calculate if the player is on the platform)
        x:-2.5,
        y:7,
        z:-12.5,
        red:0,
        radiusBottom:0.5,
        radiusTop:0,
        rotationX:-90
    })
    platformTrack2=new AFrameP5.Cone({
        x:2.5,
        y:7,
        z:-12.5,
        red:0,
        radiusBottom:0.5,
        radiusTop:0,
        rotationX:-90
    })
    platformTrack3=new AFrameP5.Cone({
        x:2.5,
        y:7,
        z:12.5,
        red:0,
        radiusBottom:0.5,
        radiusTop:0,
        rotationX:90
    })
    platformTrack4=new AFrameP5.Cone({
        x:-2.5,
        y:7,
        z:12.5,
        red:0,
        radiusBottom:0.5,
        radiusTop:0,
        rotationX:90
    })

    platformContainer.addChild(platformTrack1)
    platformContainer.addChild(platformTrack2)
    platformContainer.addChild(platformTrack3)
    platformContainer.addChild(platformTrack4)
    platformContainer.addChild(platform)
    platformContainer.addChild(cylinder)
    world.add(platformContainer)
    floatingPlatform1 = new AFrameP5.Box({ // the four floating clouds
        x: 14,
        y:8.5,
        z: 0,
        width:3,
        height:3,
        rotationX:-90
    }) 
    floatingPlatform2 = new AFrameP5.Box({
        x: -14,
        y:8.5,
        z: 0,
        width:3,
        height:3,
        rotationX:-90
    }) 
    floatingPlatform3 = new AFrameP5.Box({
        x: 0,
        y:8.5,
        z: 14,
        width:3,
        height:3,
        rotationX:-90
    }) 
    floatingPlatform4 = new AFrameP5.Box({
        x: 0,
        y:8.5,
        z:-14,
        width:3,
        height:3,
        rotationX:-90
    }) 
    world.add(floatingPlatform1)
    world.add(floatingPlatform2)
    world.add(floatingPlatform3)
    world.add(floatingPlatform4)
    p1=new portals(0,1.5,-2.05,'forward',0,9.1,-0.1,'up') // the 6 Portals
    p2=new portals(0,10.5,15.5,'forward',0,7.98,-14,'down')
    p3=new portals(0,10.5,-15.5,'backward',0,-19.98,-14,'up')
    portalarr.push(p1) // portal array for ticker
    portalarr.push(p2)
    portalarr.push(p3)
    mug = new AFrameP5.GLTF({ // mug 3d object
        asset: 'mug',
        x: 14,
        y: 9,
        z: 0,
        scaleX:0.05,
        scaleY:0.05,
        scaleZ:0.05,     
    });
    mugClicker=new AFrameP5.Sphere({ // click function not working in gltf for some reason? invisible sphere to detect clicking
        x:14,
        y:9.4,
        z:0,
        radius:0.6,
        clickFunction: function(mugger){// when clicked change the respective position in the array to 1
            pos=world.getUserPosition()
            if (dist(pos.x,pos.y,pos.z,14,9.4,0)<3){ // check if user is close
               collectables[0]=1;
        }
        }
    })
    mugClicker.hide()
    dnite = new AFrameP5.GLTF({ // dragonite 3d object
        asset: 'dnite',
        x: 0,
        y: 2,
        z: -14,
        scaleX:0.01,
        scaleY:0.01,
        scaleZ:0.01,
        rotationX:90     
    });
    dniteClicker=new AFrameP5.Sphere({ // dragonite clicker
        x:0,
        y:2,
        z:-14,
        radius:0.8,
        clickFunction: function(mugger){ // when clicked change the respective position in the array to 1
            pos=world.getUserPosition()
            if (dist(pos.x,pos.y,pos.z,0,2,-14)<3){// check if user is close
               collectables[3]=1;
        }
        }
    })
    groudon = new AFrameP5.GLTF({ // groudon 3d object
        asset: 'groudon',
        x: 0,
        y: -20,
        z: 2,
        scaleX:1.5,
        scaleY:1.5,
        scaleZ:1.5,
        rotationY:180     
    });
    groudonClicker=new AFrameP5.Sphere({ // groudon clicker
        x:0,
        y:-15,
        z:2,
        radius:7,
        clickFunction: function(clicker){// when clicked change the respective position in the array to 1
            pos=world.getUserPosition()
            if (dist(pos.x,pos.y,pos.z,0,-20,2)<3){// check if user is close
               collectables[4]=1;
        }
        }
    })
    dniteClicker.hide()
    groudonClicker.hide()
    collectablesContainer=new AFrameP5.Container3D({ // collectables container (to delete from the world)
        x:0,
        y:0,
        z:0
    })
    coin = new AFrameP5.Plane({ // coin collectable
        asset:"coin",
        x:14,
        y:1,
        z:14,
        transparent:true,
        side: 'double',
        tickFunction: function (coin) { // spin 1 degree every tick
            coin.spinY(1)
        },
        clickFunction: function (coin) { // when clicked change the respective position in the array to 1
            pos=world.getUserPosition()
            if (dist(pos.x,pos.y,pos.z,14,1,14)<3){// check if user is close
               collectables[1]=1;
        }
        }
    })
    torusKnot = new AFrameP5.TorusKnot({ // torus knot collectable
        x:-14,
        y:10,
        z:0,
        p:7,
        q:13,
        side: 'double',
        red:50,
        green:100,
        blue:200,
        scaleX:0.3,
        scaleY:0.3,
        scaleZ:0.3,
        tickFunction: function (knot) { // spin 1 degree a tick
            knot.spinY(1)
        },
        clickFunction: function (knot) {  // when clicked change the respective position in the array to 1
            pos=world.getUserPosition()
            if (dist(pos.x,pos.y,pos.z,-14,10,0)<3){// check if user is close
               collectables[2]=1;
        }
        }
    })
    collectablesContainer.addChild(groudon)
    collectablesContainer.addChild(groudonClicker)
    collectablesContainer.addChild(dnite)
    collectablesContainer.addChild(dniteClicker)
    collectablesContainer.addChild(torusKnot)
    collectablesContainer.addChild(mugClicker)
    collectablesContainer.addChild(mug)
    collectablesContainer.addChild(coin)
    world.add(collectablesContainer) // add all to collectable container
    let canvasName = createCanvas(512, 256).id(); // hud canvas
    background(255)
    fill(0)
    noFill()
    strokeWeight(5)
    rect(0,0,512,87)
    line(102,0,102,87)
    line(204,0,204,87)
    line(306,0,306,87)
    line(408,0,408,87) // create lines to separate items
    let hud = new AFrameP5.Plane({ // hud
        x: 0,
        y:-1,
        z: -1,
        dynamicTexture: true,
        dynamicTextureWidth: 512,
        dynamicTextureHeight: 256,
        asset: canvasName
    });
    world.addToHUD(hud);
}

function draw() {
    let upos=world.getUserPosition() // get user pos
    if (keyIsDown(65) || keyIsDown(68) || keyIsDown(83) || keyIsDown(87) && upos.y < 2){ // if user is clicking WASD, and on the ground, draw footprints
        floorCanvas.fill(0)
        floorCanvas.rect(map(upos.x,-15,15,0,512)-5,map(upos.z,-15,15,0,512),2,2)
        floorCanvas.rect(map(upos.x,-15,15,0,512)+5,map(upos.z,-15,15,0,512),2,2)
    }
    platformContainer.spinY(0.5) // spin the platform by 0.5 degrees every drawloop
        if (collectables[1]==1){ // if collected, update hud and remove from container
            image(coinpng,15+102,10,70,70)
            collectablesContainer.removeChild(coin)
        }
        if (collectables[0]==1){// if collected, update hud and remove from container
            image(mugpng,15,10,70,70)
            collectablesContainer.removeChild(mug)
            collectablesContainer.removeChild(mugClicker)
    }
    if (collectables[2]==1){// if collected, update hud and remove from container
        image(torus,15+102*2,10,70,70);
        collectablesContainer.removeChild(torusKnot)
}
if (collectables[3]==1){// if collected, update hud and remove from container
    image(dnitepng,15+102*3,10,70,70);
    collectablesContainer.removeChild(dnite)
    collectablesContainer.removeChild(dniteClicker)
}
if (collectables[4]==1){// if collected, update hud and remove from container
    image(groudonpng,15+102*4,10,70,70);
    collectablesContainer.removeChild(groudonClicker)
    collectablesContainer.removeChild(groudon)
}
    for (let i=0;i<portalarr.length;i++){ // move the portal cooldown for all portals
        portalarr[i].ticker();
    }
    if (collectables.every(element => element === 1)){ // check if every element in the array is 1
        background(0,255,0) // fill green
        textSize(25)
        fill(0)
        text("YOU HAVE COLLECTED EVERY ITEM!!", 25,55) // display message
    }
    let userpos= world.getUserPosition() // get userpos
    if (userpos.x > 15){ // check if user has exceed bounds of the map and bring them back if so
        world.setUserPosition(14.5,userpos.y,userpos.z)
    }
    if (userpos.x <-15){// check if user has exceed bounds of the map and bring them back if so
        world.setUserPosition(-14.5,userpos.y,userpos.z)
    }
    if (userpos.z > 15.6){// check if user has exceed bounds of the map and bring them back if so
        world.setUserPosition(userpos.x,userpos.y,14.5)
    }
    if (userpos.z <-15.6){// check if user has exceed bounds of the map and bring them back if so
        world.setUserPosition(userpos.x,userpos.y,-14.5)
    }
    if ( // if user is off the ground, 
        // check if user is using a portal, or on the main platform ,or on a side platform
        userpos.y > 1 &&
        !p1.portalFlag &&
        !p2.portalFlag &&
        !p3.portalFlag &&
        !onPlatform() &&
        !onFlyingPlatform(14,0) &&
        !onFlyingPlatform(-14,0) &&
        !onFlyingPlatform(0,14)&&
        !onFlyingPlatform(0,-14)
    ) {
        // bring the user backdown slowly
        userpos.y -= 0.1;
        world.setUserPosition(userpos.x, userpos.y, userpos.z);
    }
}

// Portals class, was playing around with it for final project but was scrapped because i wasnt able to achieve what i wanted to do with it
// very cool to use though and place around with just a few parameter (1,y1,z1,direction1,x2,y2,z2,direction2)
class portals{
    
    constructor(x1,y1,z1,direction1,x2,y2,z2,direction2){
        let portal1; 
        let portal2;
        this.pwall1;
        this.pwall2;
        let pos;
        this.portalFlag=false
        this.tickThreshhold=90 // portal use cooldown
        this.ticks=0
        this.rotx1=0;
        this.roty1=0;
        this.rotz1=0;
        this.rotx2=0;
        this.roty2=0;
        this.rotz2=0;
        this.red=random(255)
        this.green=random(255)
        this.blue=random(255)
        if (direction1=='up'){ // depending on direction change orientation
            this.rotx1=-90;
        }
        if (direction1=='down'){
            this.rotx1=90;
        }
        if (direction1=='right'){
            this.roty1=-90;
        }
        if (direction1=='left'){
            this.roty1=90;
        }
        portal1 = new AFrameP5.Circle({ // portal
            
            x: x1, y: y1, z: z1,
            rotationX: this.rotx1,rotationY: this.roty1,rotationZ: this.rotz1,
            radius: 1,
            red: this.red, // set color
            green: this.green, 
            blue: this.blue,
            side: 'double',
            clickFunction: () => { // when clicked
                if (!this.portalFlag){ // check if portal is under cooldown
                pos = world.getUserPosition() // get position of user
                if (dist(pos.x,pos.y,pos.z,x1,y1,z1)<5){ // check if user is close
                world.enableWASD(false); // disable movement
                world.slideToObject(portal1, 1000); // slide the user to the portal
                sleep(1000).then(() => {world.teleportToObject(portal2);}); // wait 1000ms and teleport to portal2
                sleep(1050).then(() => {pos = world.getUserPosition(); // wait 1050s then get user position
                    if (direction2=='up'){
                        pos.y=pos.y+1.5
                    }
                    if (direction2=='down'){
                        pos.y=pos.y-2
                    }
                    if (direction2=='right'){
                        pos.x=pos.x+1
                    }
                    if (direction2=='left'){
                        pos.x=pos.x-1
                    }
                    if (direction2=='forward'){
                        pos.z=pos.z-1
                    }
                    if (direction2=='backward'){
                        pos.z=pos.z+1
                    }
                world.setUserPosition(pos.x,pos.y,pos.z);  
                this.ticks=0; 
                world.enableWASD(true);
                });      
                this.portalFlag=true; 
            }
        }
            }
        });
        if (direction1=='up'){
            y1=y1-0.01;
        }
        if (direction1=='down'){
            y1=y1+0.01
        }
        if (direction1=='right'){
            x1=x1-0.01
        }
        if (direction1=='left'){
            x1=x1+0.01
        }
        if (direction1=='forward'){
            z1=z1+0.01
        }
        if (direction1=='backward'){
            z1=z1-0.01
        }
        this.pwall1=new AFrameP5.Plane({
            green:20,
            red:20,
            blue:20,
            rotationX: this.rotx1,rotationY: this.roty1,rotationZ: this.rotz1,
            x:x1,
            y:y1,
            z:z1,
            width:3,
            height:3,
            side:'double'

        }
    )
    if (direction2=='up'){
        this.rotx2=-90;
    }
    if (direction2=='down'){
        this.rotx2=90;
    }
    if (direction2=='right'){
        this.roty2=-90;
    }
    if (direction2=='left'){
        this.roty2=90;
    }
    portal2 = new AFrameP5.Circle({
        x: x2, y: y2, z: z2,
        rotationX: this.rotx2, rotationY: this.roty2,rotationZ: this.rotz2,
        radius: 1,
        red: 255-this.red, green: 255-this.green, blue: 255-this.blue,
        side: 'double',
        clickFunction: () => {
            if (!this.portalFlag){
            pos = world.getUserPosition()
            if (dist(pos.x,pos.y,pos.z,x2,y2,z2)<5){
            world.enableWASD(false);
            world.slideToObject(portal2, 1000);
            sleep(1000).then(() => {world.teleportToObject(portal1);});
            sleep(1050).then(() => {pos = world.getUserPosition();
                if (direction1=='up'){
                    pos.y=pos.y+1.5
                }
                if (direction1=='down'){
                    pos.y=pos.y-2
                }
                if (direction1=='right'){
                    pos.x=pos.x+1
                }
                if (direction1=='left'){
                    pos.x=pos.x-1
                }
                if (direction1=='forward'){
                    pos.z=pos.z-1
                }
                if (direction1=='backward'){
                    pos.z=pos.z+1
                }
            world.setUserPosition(pos.x,pos.y,pos.z);  
            this.ticks=0; 
            world.enableWASD(true);
            });      
            this.portalFlag=true; 
        }
    }
        }
    });
    if (direction2=='up'){
        y2=y2-0.01;
    }
    if (direction2=='down'){
        y2=y2+0.01
    }
    if (direction2=='right'){
        x2=x2-0.01
    }
    if (direction2=='left'){
        x2=x2+0.01
    }
    if (direction2=='forward'){
        z2=z2+0.01
    }
    if (direction2=='backward'){
        z2=z2-0.01
    }
    this.pwall2=new AFrameP5.Plane({
        green:20,
        red:20,
        blue:20,
        rotationX: this.rotx2, rotationY: this.roty2,rotationZ: this.rotz2,
        x:x2,
        y:y2,
        z:z2,
        width:3,
        height:3,
        side:'double'

    }
)
        world.add(this.pwall1)
        world.add(portal1)
        world.add(this.pwall2)
        world.add(portal2)
    }

    ticker(){
        if (this.ticks > this.tickThreshhold){
            this.ticks=0;
            this.portalFlag=false
        }
        else{
            this.ticks++;
        }
    }
}

// taken from https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function onPlatform() {
    // Get the user's current position
    let userPos = world.getUserPosition();
    let px = userPos.x;
    let pz = userPos.z;

    // Dynamically get the world positions of the platform vertices
    let vertices = [
        platformTrack1.getWorldPosition(),
        platformTrack2.getWorldPosition(),
        platformTrack3.getWorldPosition(),
        platformTrack4.getWorldPosition()
    ];

    // Function to calculate the area of a triangle using 3 points
    function triangleArea(ax, az, bx,bz, cx, cz) {
        return Math.abs(
            (bx * az - ax * bz) +
            (cx * bz - bx * cz) +
            (ax * cz - cx * az)
        ) / 2;
    }

    // Calculate the areas of the triangles formed with the point and rectangle vertices
    let totalArea = 0;
    totalArea += triangleArea(px, pz, vertices[0].x, vertices[0].z, vertices[3].x, vertices[3].z);
    totalArea += triangleArea(px, pz, vertices[3].x, vertices[3].z, vertices[2].x, vertices[2].z);
    totalArea += triangleArea(px, pz, vertices[2].x, vertices[2].z, vertices[1].x, vertices[1].z);
    totalArea += triangleArea(px, pz, vertices[1].x, vertices[1].z, vertices[0].x, vertices[0].z);

    // Calculate the area of the platform rectangle
    let platformArea = triangleArea(
        vertices[0].x, vertices[0].z,
        vertices[1].x, vertices[1].z,
        vertices[2].x, vertices[2].z
    ) + triangleArea(
        vertices[2].x, vertices[2].z,
        vertices[3].x, vertices[3].z,
        vertices[0].x, vertices[0].z
    );

    // Check if the sum of triangle areas is approximately equal to the rectangle's area
    return Math.abs(totalArea - platformArea) < 0.01 && userPos.y > 8 ;
}

function onFlyingPlatform(x,z){
    size=3;
    let pos = world.getUserPosition();
    x=x-size/2
    z=z-size/2
    if (
        pos.x > x &&
        pos.z > z &&
        pos.x < x+size &&
        pos.z < z+size && 
        pos.y > 10
    ){
        return true
    }
}
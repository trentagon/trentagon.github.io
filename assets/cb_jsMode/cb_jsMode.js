

//Major parameters
let timeBetweenFlowers;

//Frame offsets
let of1;
let of2;

//System variables
let flowers = [];
let FR; // frame rate
let alternator;
let vrs = [];

//Background color
let bg_col;
let sky_col;
let trim_col;

//Spatial parameters
let VaseBase; 
let VaseTop; 
let StemBase;

//Saving with CCapture
//const capturer = new CCapture({
//  framerate: 30,
//  format: "jpg",
//  name: "zipped_movie",
//  quality: 100,
//  verbose: true,
//});

//let p5Canvas;

function setup() {

  //Create canvas
  createCanvas(windowWidth, windowHeight);
  FR = 30;
  frameRate(FR); //30 fps
  
  //Canvas properties
  colorMode(HSB, 100); //Colors are between 0 and 100
  rectMode(CENTER); //rectangle
  textSize(30);
  
  //Set background color
  bg_col = color('#f6f4ec'); //Background color
  sky_col = color('#4eabff');
  trim_col = color('#ffeead');
  background(bg_col);

  //Spatial parameters
  VaseBase = new p5.Vector(0, height*0.5); //Location of the bottom of the vase
  VaseTop = new p5.Vector(0, height*0.25); //Location of the top of the vase
  StemBase = new p5.Vector(0, height*0.25); //Location of the bottom of the stems

  //Aesthetic parameters
  timeBetweenFlowers = 1;

  //Add a flower to start the party
  alternator = 1;
  flowers.push(new Flower(StemBase, alternator));
  alternator = alternator + 1;

  //---BEGIN RANDOM NUMBER GENERATION

  for (let i = 0; i < 20; i ++) {
    vrs.push(random(0, 10));
  }

  //---END RANDOM NUMBER GENERATION
}

function draw() {
  
  
  //Set scaling in this loop so that it responds to window resize
  VaseBase = new p5.Vector(0, height*0.5); //Location of the bottom of the vase
  VaseTop = new p5.Vector(0, height*0.25); //Location of the top of the vase
  StemBase = new p5.Vector(0, height*0.25); //Location of the bottom of the stems

  //Frame offsets
  fo1 = 0.2*0.5*width; //frame offset in pixels
  fo2 = 0.3*0.5*width; //frame offset in pixels


  //Draw background
  background(bg_col);

  //Translate to center
  translate(width/2, height/2);

  //Window Trim
  //noFill();
  //stroke(20);
  //strokeWeight(1);
  //rect(0, 0, width-(fo1), height-(fo1));

  ////Window
  //stroke(20);
  //strokeWeight(5);
  //rect(0, 0, width-(fo2), height-(fo2));

  //Generate a new flower at some cadence.
  if (int(frameCount) % int(timeBetweenFlowers*FR) == 0) {
    flowers.push(new Flower(StemBase, alternator));
    alternator = alternator + 1;
  }

  //Grow the flower until it is complete.
  for (let i=0; i < flowers.length; i++) {
    flowers[i].grow();
  }


  //Fade flower when done
  if (flowers[0].faded()) {
    flowers.shift();
  }

  //Draw vase.
  drawVase(VaseBase, VaseTop, vrs);
  
  //if (frameCount === 1) {capturer.start();}
  //capturer.capture(p5Canvas.canvas);
  //if (frameCount === 600) {
  //  noLoop();
  //  capturer.stop();
  //  capturer.save();
  //  }
  
  
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function mousePressed() {
  loop(); // Starts the draw loop if it's stopped
  setup(); // Calls the setup function to restart the animation
}


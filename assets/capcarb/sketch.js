const EMBED_MODE = new URLSearchParams(window.location.search).get("embed") === "true";

let numRows, numCols;
let pco2, omega, temp, pH, alk;
let pHData = [],
  pco2Data = [],
  omegaData = [],
  tempData = [],
  alkData = [];
let models = [];
let pendingModels = [];
let numModels = 25;
let modelInterval = 1; // frames between new models
let modelTimer = 0;

let mapMin = -0.3;
let mapMax = 1.3;
// At the top of your sketch.js
let risoLayer1, risoLayer2, risoLayer3, risoLayer4;

const MODEL_COLORS = [
  "#4f4086", // violet
  "#a62c37", // red
  "#501345", // purple
];

function preload() {
  // Load data tables
  pH = loadTable("data_small/pH.csv", "csv", "header");
  pco2 = loadTable("data_small/pco2.csv", "csv", "header");
  omega = loadTable("data_small/omega.csv", "csv", "header");
  temp = loadTable("data_small/temp.csv", "csv", "header");
  alk = loadTable("data_small/alk.csv", "csv", "header");

  // Load piano notes
  sampler = new Tone.Sampler(
    {
      A0: "A0.[mp3|ogg]",
      C1: "C1.[mp3|ogg]",
      "D#1": "Ds1.[mp3|ogg]",
      "F#1": "Fs1.[mp3|ogg]",
      A1: "A1.[mp3|ogg]",
      C2: "C2.[mp3|ogg]",
      "D#2": "Ds2.[mp3|ogg]",
      "F#2": "Fs2.[mp3|ogg]",
      A2: "A2.[mp3|ogg]",
      C3: "C3.[mp3|ogg]",
      "D#3": "Ds3.[mp3|ogg]",
      "F#3": "Fs3.[mp3|ogg]",
      A3: "A3.[mp3|ogg]",
      C4: "C4.[mp3|ogg]",
      "D#4": "Ds4.[mp3|ogg]",
      "F#4": "Fs4.[mp3|ogg]",
      A4: "A4.[mp3|ogg]",
      C5: "C5.[mp3|ogg]",
      "D#5": "Ds5.[mp3|ogg]",
      "F#5": "Fs5.[mp3|ogg]",
      A5: "A5.[mp3|ogg]",
      C6: "C6.[mp3|ogg]",
      "D#6": "Ds6.[mp3|ogg]",
      "F#6": "Fs6.[mp3|ogg]",
      A6: "A6.[mp3|ogg]",
      C7: "C7.[mp3|ogg]",
      "D#7": "Ds7.[mp3|ogg]",
      "F#7": "Fs7.[mp3|ogg]",
      A7: "A7.[mp3|ogg]",
      C8: "C8.[mp3|ogg]",
    },
    {
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Choose some riso colors (see https://github.com/andreasref/p5.riso#colors)
  risoLayer1 = new Riso("SUNFLOWER");
  risoLayer2 = new Riso("FLURO_PINK");
  risoLayer3 = new Riso("AQUA");
  risoLayer4 = new Riso("BLACK");

  numRows = pco2.getRowCount();
  numCols = pco2.getColumnCount();

  for (let r = 0; r < numRows; r++) {
    let row_pH = [];
    let row_pco2 = [];
    let row_omega = [];
    let row_alk = [];
    for (let c = 0; c < numCols; c++) {
      row_pH.push(float(pH.getString(r, c)));
      row_pco2.push(float(pco2.getString(r, c)));
      row_omega.push(float(omega.getString(r, c)));
      row_alk.push(float(alk.getString(r, c)));
    }
    pHData.push(row_pH);
    pco2Data.push(row_pco2);
    omegaData.push(row_omega);
    alkData.push(row_alk);
  }

  // Prepare a queue of random columns for models
  for (let i = 0; i < numModels; i++) {
    let col = int(random(numCols));
    pendingModels.push(col);
  }

  // Sound
  notesOne = [
    "C4",
    "D4",
    "E5",
    "G5",
    "A5",
    "C3",
    "E3",
    "F3",
    "G3",
    "C2",
    "F2",
    "A2",
  ];
  notesTwo = ["C3", "E3", "F3", "G3"];
  notesThree = ["C2", "F2", "A2"];
  timeOne = [30, 90, 90, 90, 120, 180, 240];
  timeTwo = [90, 120, 180, 240];
  timeThree = [120, 240];
  masterVol = new Tone.Volume(-12);
  reverbVol = new Tone.Volume(-12);
  masterVol.toMaster();
  reverb = new Tone.JCReverb().toMaster();
  reverb.decay = 100;
  reverb.wet = 1;
  reverb.roomSize = 100;
  sampler.connect(masterVol);
  sampler.connect(reverbVol);
  reverbVol.connect(reverb);
}

function draw() {
  background(255, 255, 255, 150);

  // Staggered model creation
  if (pendingModels.length > 0 && modelTimer <= 0) {
    let col = pendingModels.shift();
    models.push(new Model(col));
    modelTimer = modelInterval;
  } else {
    modelTimer--;
  }

  // Update and display models
  for (let i = models.length - 1; i >= 0; i--) {
    models[i].update();
    models[i].display();

    // Remove finished models and queue a new one
    if (models[i].isFinished()) {
      models.splice(i, 1);
      let col = int(random(numCols));
      pendingModels.push(col);
    }
  }

  stroke(0);
  strokeWeight(1);
  line(width / 2, 0, width / 2, height);

  displayInfo();
}

function playSynth(note, velocity) {
  if (EMBED_MODE) return;
  sampler.triggerAttackRelease(note, 8, "+0.0", velocity);
}

class Model {
  constructor(col) {
    this.col = col;
    this.t = 0; // start at a random time step
    this.lifetime = numRows - 1; // total frames for this model
    this.fadeFrames = 40; // frames to fade in/out
    this.alpha = 0; // start fully transparent

    this.xflip = random() < 0.5;
    this.yflip = random() < 0.5;
    // this.xflip = false;
    // this.yflip = false;

    this.modelColor = color(random(MODEL_COLORS));

    this.note = random(notesOne); // Assign a random note
    this.prevX = null; // For crossing detection
    this.hasCrossed = false; // To avoid repeated triggers
  }

  update() {
    this.t++;
    // Fade in
    if (this.t < this.fadeFrames) {
      this.alpha = map(this.t, 0, this.fadeFrames, 0, 255);
    }
    // Fade out
    else if (this.t > this.lifetime - this.fadeFrames) {
      this.alpha = map(
        this.t,
        this.lifetime - this.fadeFrames,
        this.lifetime,
        255,
        0
      );
    }
    // Fully visible
    else {
      this.alpha = 255;
    }
  }

  display() {
    // Draw the tail: line through all previous positions up to this.t
    this.modelColor.setAlpha(this.alpha / 2);
    stroke(this.modelColor);
    strokeWeight(0.1);
    noStroke();
    noFill();
    beginShape();
    for (let i = 0; i <= this.t; i++) {
      let x = this.xflip
        ? map(pHData[i][this.col], mapMin, mapMax, width, 0)
        : map(pHData[i][this.col], mapMin, mapMax, 0, width);

      let y = this.yflip
        ? map(omegaData[i][this.col], mapMin, mapMax, height / 4, height)
        : map(omegaData[i][this.col], mapMin, mapMax, (3 * height) / 4, 0);

      vertex(x, y);
    }
    endShape();

    // Current position
    let x = this.xflip
      ? map(pHData[this.t][this.col], mapMin, mapMax, width, 0)
      : map(pHData[this.t][this.col], mapMin, mapMax, 0, width);

    let y = this.yflip
      ? map(omegaData[this.t][this.col], mapMin, mapMax, height / 4, height)
      : map(omegaData[this.t][this.col], mapMin, mapMax, (3 * height) / 4, 0);

    // Size based on pCO2 value
    let pco2Value = pco2Data[this.t][this.col];
    let size = map(pco2Value, mapMin, mapMax, 10, 80);

    // --- Center line crossing detection (account for circle size) ---
    let centerX = width / 2;
    let leftEdge = x - size / 2;
    let rightEdge = x + size / 2;
    let prevLeftEdge = this.prevX !== null ? this.prevX - size / 2 : null;
    let prevRightEdge = this.prevX !== null ? this.prevX + size / 2 : null;

    if (this.prevX !== null) {
      // Check if any part of the circle crosses the center line between frames
      let crossed =
        (prevLeftEdge < centerX && rightEdge >= centerX) ||
        (prevRightEdge > centerX && leftEdge <= centerX);

      if (crossed) {
        if (!this.hasCrossed) {
          playSynth(this.note, random(0.3, 1)); // Play the assigned note
          this.hasCrossed = true;
        }
      } else {
        this.hasCrossed = false;
      }
    }
    this.prevX = x;

    // Color and transparency
    this.modelColor.setAlpha(this.alpha);
    stroke(0, this.alpha);
    noStroke();
    fill(this.modelColor);
    ellipse(x, y, size, size);
  }

  isFinished() {
    return this.t >= this.lifetime;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255); // Clear background on resize
}

function displayInfo() {
  // --- Info textbox in top left ---
  let boxX = 30;
  let boxY = 30;
  let boxW = 420;
  let boxH = 140;
  push();
  fill(255, 230); // semi-transparent white
  stroke(0); // semi-transparent black border
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH); // <-- no rounded corners

  fill(0, 200); // black text
  noStroke();
  textSize(15);
  textFont("Courier");
  textAlign(LEFT, TOP);

  // Draw title in bold
  textStyle(BOLD);
  text(
    "Each circle is a simulation of the Marinoan Snowball Earth event (ca. 639 Ma)",
    boxX + 16,
    boxY + 14,
    boxW - 32,
    50
  );
  // Draw the rest in normal style
  textStyle(NORMAL);
  let info =
    "x-axis: ocean pH\n" +
    "y-axis: ocean carbonate saturation state\n" +
    "size: atmospheric pCO2\n" +
    "data source: Thomas and Catling (2024)";
  text(info, boxX + 16, boxY + 54, boxW - 32, boxH - 58);

  pop();
}

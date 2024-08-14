class Flower {
  constructor(stemBase_, alternator_) {

    //General Sizing of bouquet
    this.stemBase = stemBase_;
    this.TotHeight = height*0.7;
    this.TotWidth = width*0.9;

    //Petal vars
    this.alternator = alternator_;

    this.minNumPetals = 10;
    this.maxNumPetals = 30;

    this.minNumPoints = 5;
    this.maxNumPoints = 10;

    this.minS = 80;
    this.maxS = 100;

    this.minB = 80;
    this.maxB = 100;

    this.minA = 20;
    this.maxA = 60;

    this.minColGap = 0;


    this.minRad = 0.5*(width + height)*0.025;
    this.maxRad = 0.5*(width + height)*0.09;

    this.maxRotOffset = 15;
    this.maxRotSpeed = 0.05;
    this.maxPointOsc = 0.05;

    this.spread = 0.5*(width + height)*0.05

      //Leaf Vars

      this.minLeafWidth = 0.5*(width + height)*0.03;
    this.maxLeafWidth = 0.5*(width + height)*0.04;
    this.minLeafLength = 0.5*(width + height)*0.06;
    this.maxLeafLength = 0.5*(width + height)*0.12;

    //Stem Design
    this.StemRes = 300; //How many individual shapes make up stem?
    this.StemSize = 2; //Size of individual shapes
    this.StemColor1 = color('#3b560b');
    this.StemColor2 = color('#bddd97');

    //Frames and Timing
    this.StartFrame = int(frameCount);
    this.TotalFrames = 4*FR; //How many frames is the whole thing
    this.pctTicker = 0; //Keeps track of how far through evolution we are
    this.pctStemGrowing = 0.5; //How long til stem grows
    this.pctPetalStart = 0.0; //When to start petal growth?
    this.pctPetalGrowing = 0.5; //How long til petal grows?
    this.pctFading = 0.9; //How long until fading starts?

    //--BEGIN RANDOM GENERATION--

    //Bezier Points
    this.b1 = new p5.Vector(this.stemBase.x + random(-0.3*this.TotWidth, 0.3*this.TotWidth), this.stemBase.y -random(0.1*height, this.TotHeight));
    this.b2 = new p5.Vector(this.stemBase.x + random(-0.4*this.TotWidth, 0.4*this.TotWidth), this.stemBase.y -random(0.1*height, this.TotHeight));
    this.b3 = new p5.Vector(this.stemBase.x + random(-0.5*this.TotWidth, 0.5*this.TotWidth), this.stemBase.y -random(0.1*height, this.TotHeight));
    this.Sway1 = random(-0.4, 0.4);
    this.Sway2 = random(-0.4, 0.4);
    this.Sway3 = random(-0.4, 0.4);

    //Leaves
    this.leafPos1 = random(0.05, 0.95);
    this.leafPos2 = random(0.05, 0.95);
    this.leafPos3 = random(0.05, 0.95);

    this.lws = [];
    this.lls = [];
    this.lrots = [];
    this.lbz1 = [];
    this.lbz2 = [];
    this.lbz3 = [];
    this.ldir = [];

    for (let i = 0; i < 3; i ++) {
      this.lws.push(random(this.minLeafWidth, this.maxLeafWidth));
      this.lls.push(random(this.minLeafLength, this.maxLeafLength));
      this.lrots.push(random(80, 120));
      this.lbz1.push(random(0.5*this.maxLeafWidth, this.maxLeafWidth))
        this.lbz2.push(random(0.5*this.maxLeafWidth, this.maxLeafWidth))
        this.lbz3.push(random(0.5*this.maxLeafWidth, this.maxLeafWidth))
        if (random(0, 1) > 0.5) {
        this.ldir.push(1.0);
      } else {
        this.ldir.push(-1.0);
      }
    }

    //Petal Design
    this.numPetals = int(random(this.minNumPetals, this.maxNumPetals + 1));
    this.maxColGap = random(10, 70);

    //Petal seed randoms
    this.r1a = [];
    this.r1b = [];
    this.r2a = [];
    this.r2b = [];
    this.r3a = [];
    this.r3b = [];

    for (let i = 0; i < this.maxNumPetals; i ++) {
      this.r1a.push(random(0, 10));
      this.r1b.push(random(0, 10));
      this.r2a.push(random(0, 10));
      this.r2b.push(random(0, 10));
      this.r3a.push(random(0, 10));
      this.r3b.push(random(0, 10));
    }


    //--END RANDOM GENERATION
  }
  grow() {

    //Where in the evolution are we? (as a decimal percent)
    this.pctTicker = (int(frameCount)-this.StartFrame)/this.TotalFrames;

    //Calculate fade percentage
    if (this.pctTicker < this.pctFading) {
      this.Fade = 1;
    } else {
      this.Fade = (1-this.pctTicker)/(1 - this.pctFading);
    }

    //Sway the points of the flower
    let TWO_PI = 3.14159265*2;
    this.b1.add(this.Sway1*sin(0.15*TWO_PI*frameCount/200), this.Sway1*cos(0.10*TWO_PI*frameCount/200));
    this.b2.add(this.Sway2*cos(0.10*TWO_PI*frameCount/200), this.Sway2*sin(0.15*TWO_PI*frameCount/200));
    this.b3.add(this.Sway3*sin(0.15*TWO_PI*frameCount/200), this.Sway3*cos(0.15*TWO_PI*frameCount/200));

    //Grow stem
    let StemGrowth = map3(min(1, this.pctTicker/this.pctStemGrowing), 0, 1, 0, 1, 1.7, 2);
    let tStem;
    let lerpedColStem;
    noStroke();
    for (let i = 0; i <= this.StemRes*StemGrowth; i++) {
      lerpedColStem = lerpColor(this.StemColor1, this.StemColor2, map(i, 0, this.StemRes, 0, 1));
      lerpedColStem.setAlpha(100*this.Fade);
      fill(lerpedColStem);
      tStem = map3(i / this.StemRes, 0, 1, 0, 1, 1.7, 2);
      this.stemX = bezierPoint(this.stemBase.x, this.b1.x, this.b2.x, this.b3.x, tStem);
      this.stemY = bezierPoint(this.stemBase.y, this.b1.y, this.b2.y, this.b3.y, tStem);
      circle(this.stemX - this.StemSize/2, this.stemY - this.StemSize/2, this.StemSize);
    }

    //Add leaves to stem
    push(); // 1
    let leafCol1 = lerpColor(this.StemColor1, this.StemColor2, this.leafPos1);
    leafCol1.setAlpha(100*this.Fade);
    fill(leafCol1);
    translate(bezierPoint(this.stemBase.x, this.b1.x, this.b2.x, this.b3.x, this.leafPos1*StemGrowth), bezierPoint(this.stemBase.y, this.b1.y, this.b2.y, this.b3.y, this.leafPos1*StemGrowth));
    this.drawLeaf(StemGrowth, this.lls[0], this.lrots[0] + (this.ldir[0]*frameCount/this.lrots[0]), this.lbz1);
    pop();

    push(); // 2
    let leafCol2 = lerpColor(this.StemColor1, this.StemColor2, this.leafPos2);
    leafCol2.setAlpha(100*this.Fade);
    fill(leafCol2);        
    translate(bezierPoint(this.stemBase.x, this.b1.x, this.b2.x, this.b3.x, this.leafPos2*StemGrowth), bezierPoint(this.stemBase.y, this.b1.y, this.b2.y, this.b3.y, this.leafPos2*StemGrowth));
    this.drawLeaf(StemGrowth, this.lls[1], this.lrots[1] + (this.ldir[1]*frameCount/this.lrots[1]), this.lbz2);
    pop();

    push(); // 3
    let leafCol3 = lerpColor(this.StemColor1, this.StemColor2, this.leafPos3);
    leafCol3.setAlpha(100*this.Fade);
    fill(leafCol3);
    translate(bezierPoint(this.stemBase.x, this.b1.x, this.b2.x, this.b3.x, this.leafPos3*StemGrowth), bezierPoint(this.stemBase.y, this.b1.y, this.b2.y, this.b3.y, this.leafPos3*StemGrowth));
    this.drawLeaf(StemGrowth, this.lls[2], this.lrots[2] + (this.ldir[2]*frameCount/this.lrots[2]), this.lbz3);
    pop();

    //Add top base
    noStroke();
    fill(lerpedColStem, 255*this.Fade);
    circle(this.stemX, this.stemY, 20*this.PetGrowth);

    //Random numbers for petal creation
    let r1;
    let r2;
    if (this.alternator % 3 == 0) {
      r1 = this.r1a;
      r2 = this.r1b;
    } else if (this.alternator % 3 == 1) {
      r1 = this.r2a;
      r2 = this.r2b;
    } else if (this.alternator % 3 == 2) {
      r1 = this.r3a;
      r2 = this.r3b;
    }

    //How much have they grown?
    if (this.pctTicker < this.pctPetalStart) {
      this.PetGrowth = 0;
    } else {
      this.PetGrowth = min(1, (this.pctTicker-this.pctPetalStart)/this.pctPetalGrowing);
    }
    this.PetGrowth = map3(this.PetGrowth, 0, 1, 0, 1, 1.7, 2);

    //Seed Color
    let col = map(r1[0], 0, 10, 0, 100);

    //Draw Petals
    for (let i = 0; i <= this.numPetals; i++) {

      //Roation and translation
      let ro1 = map(r1[i], 0, 10, -this.maxRotOffset, this.maxRotOffset); //baseline rotation offset
      let ro2 = map(i, 0, this.numPetals, 0.5, 1); //scale offset by petal size
      let ro3 = map3(this.PetGrowth, 0, 1, this.spread, 1, 1.7, 2); //scale offset by petal growth
      let ro = ro1*ro2*ro3;
      let rs = map(r2[i], 0, 10, -this.maxRotSpeed, this.maxRotSpeed); //roation speed

      push();
      translate(this.stemX + ro, this.stemY + ro);
      rotate(rs*frameCount);
      translate(-this.stemX - ro, -this.stemY - ro);
      beginShape();

      //Color
      let cg = map(r1[i], 0, 10, this.minColGap, this.maxColGap); //color gap
      let sat = map(r2[i], 0, 10, this.minS, this.maxS);
      let bri = map(r2[i], 0, 10, this.minB, this.maxB);
      let alph = map(r2[i], 0, 10, this.minA, this.maxA);

      fill((col + cg) % 100, sat, bri, alph*this.Fade*this.PetGrowth);

      //Size and drawing
      let r = map(r2[i], 0, 10, this.minRad, this.maxRad)*this.PetGrowth;
      let pts = map(r1[i], 0, 10, this.minNumPoints, this.maxNumPoints);
      let ang = TWO_PI/pts;
      let relSize = map(i, 0, this.numPetals, 1, 0.2);
      let pm;

      for (let j=0; j < pts; j++) {
        if (j % 2 == 0) {
          pm = 1 - map(r1[i], 0, 10, 0, this.maxPointOsc);
        } else {
          pm = 1 + map(r1[i], 0, 10, 0, this.maxPointOsc);
        }
        let relSize = map(i, 0, this.numPetals, 1, 0.2);
        let x = r*pm*relSize*(cos(ang*j));
        let y = r*pm*relSize*(sin(ang*j)); 
        let p = new p5.Vector(x, y);       
        vertex(this.stemX - p.x, this.stemY - p.y);
      }
      endShape(CLOSE);
      pop();
    }
  }
  faded() {
    if (this.pctTicker >= 1) {
      return true;
    } else {
      return false;
    }
  }
  drawLeaf(sg, ll, lrot, bz) {
    push();
    rotate(lrot);
    beginShape();
    vertex(0, 0);
    bezierVertex(sg*bz[0], 0.25*sg*ll, bz[1], 0.75*sg*ll, 0, sg*ll);
    bezierVertex(-sg*bz[0], 0.75*sg*ll, -sg*bz[2], 0.25*sg*ll, 0, 0);
    endShape();

    stroke(100, 5);
    strokeWeight(4);
    noFill();
    beginShape();
    vertex(0, 0.1*ll);
    bezierVertex(0.4*bz[0], 0.25*ll, 0.3*bz[1], 0.75*ll, 0, 0.9*ll);
    endShape();
    pop();
  }
}

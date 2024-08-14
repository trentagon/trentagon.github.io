function drawVase(base, top, vrs) {

  noStroke();
  translate(base.x, base.y);

  let VSS = 200*sin(float(frameCount)/250);
  let VSC = 150*cos(float(frameCount)/200);

  let colorNum = map(vrs[0], 0, 10, 0, 100);
  let colorGap = map(vrs[1], 0, 10, 2, 12);
  let c1 = colorNum;
  let c2 = (colorNum + colorGap) % 100;
  let c3 = (colorNum - colorGap) % 100;
  let c4 = (colorNum + (0.5*colorGap)) % 100;

  let sat = map(vrs[2], 0, 10, 70, 100);
  let bri = map(vrs[3], 0, 10, 70, 100);
  let alph = map(vrs[4], 0, 10, 10, 50);

  let capw = 60;
  let caph = 10;

  let vaseWidth = 150;
  let minb = 20;

  let bz1 = map(vrs[5], 0, 10, -vaseWidth, vaseWidth);
  let bz2 = map(vrs[6], 0, 10, -vaseWidth, vaseWidth);
  let bz3 = map(vrs[7], 0, 10, -vaseWidth, vaseWidth);
  let bz4 = map(vrs[8], 0, 10, -vaseWidth, vaseWidth);
  let bz5 = map(vrs[9], 0, 10, -vaseWidth, vaseWidth);
  let bz6 = map(vrs[10], 0, 10, -vaseWidth, vaseWidth);
  let bz7 = map(vrs[11], 0, 10, -vaseWidth, vaseWidth);
  let bz8 = map(vrs[12], 0, 10, -vaseWidth, vaseWidth);
  let bz9 = map(vrs[13], 0, 10, -vaseWidth, vaseWidth);
  let bz10 = map(vrs[14], 0, 10, -vaseWidth, vaseWidth);

  fill(20);

  rect(top.x, -top.y - (caph/2), capw, caph);
  rect(base.x, -(caph/2), capw, caph); 

  fill(bg_col);
  beginShape();
  vertex(0, -caph);
  bezierVertex(bz1 - 0.5*VSS, -top.y*0.3, bz2, -top.y*0.6, top.x, - top.y);
  endShape();

  beginShape();
  vertex(0, -caph);
  bezierVertex(-bz3, -top.y*0.3, -bz4 + 0.5*VSC, -top.y*0.6, -top.x, - top.y);
  endShape();

  beginShape();
  vertex(0, -caph);
  bezierVertex(bz5 + VSS, -top.y*0.2, bz6 - VSS, -top.y*0.8, top.x, - top.y);
  endShape();

  beginShape();
  vertex(0, -caph);
  bezierVertex(bz7 - VSC, -top.y*0.2, bz8 + VSC, -top.y*0.8, top.x, - top.y);
  endShape();

  beginShape();
  vertex(0, -caph);
  bezierVertex(bz9 + VSS, -top.y*0.2, bz10 + VSC, -top.y*0.8, top.x, - top.y);
  endShape();

  fill(c1, sat, bri, alph);
  beginShape();
  vertex(0, -caph);
  bezierVertex(bz1 - 0.5*VSS, -top.y*0.3, bz2, -top.y*0.6, top.x, - top.y);
  endShape();

  beginShape();
  vertex(0, -caph);
  bezierVertex(-bz3, -top.y*0.3, -bz4 + 0.5*VSC, -top.y*0.6, -top.x, - top.y);
  endShape();

  fill(c2, sat, bri, alph);
  beginShape();
  vertex(0, -caph);
  bezierVertex(bz5 + VSS, -top.y*0.2, bz6 - VSS, -top.y*0.8, top.x, - top.y);
  endShape();

  fill(c3, sat, bri, alph);
  beginShape();
  vertex(0, -caph);
  bezierVertex(bz7 - VSC, -top.y*0.2, bz8 + VSC, -top.y*0.8, top.x, - top.y);
  endShape();

  fill(c4, sat, bri, alph);
  beginShape();
  vertex(0, -caph);
  bezierVertex(bz9 + VSS, -top.y*0.2, bz10 + VSC, -top.y*0.8, top.x, - top.y);
  endShape();
}

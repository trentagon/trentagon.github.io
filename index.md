---
layout: default
title: Trent B. Thomas
---

<h1 class="title">Trent B. Thomas</h1>
<h2 class="subtitle">Personal Website</h2>

<div id="p5-sketch-container" style="display: flex; justify-content: center; align-items: center;"></div>

Welcome! I am a Ph.D. candidate in the Earth and Space Sciences Department and Astrobiology Program at the [University of Washington](https://ess.uw.edu/people/trent-thomas/){:target="\_blank"}.

I study topics related to planetary science, astrobiology, and the evolution of planetary atmospheres. Explore the links below to learn more.

<div style="display: flex; justify-content: space-between;">
    <div style="flex: 1; margin-right: 20px;">
        <h3>Professional</h3>
        <ul style="list-style-type: square;">
            <li><a href="pages/research_interests.html">Research Interests</a></li>
            <li><a href="assets/tthomas_cv.pdf" target="_blank">Curriculum Vitae</a></li>
            <li><a href="pages/publications_and_code.html">Publications & Code</a></li>
            <!-- <li><a href="pages/science_communication.html">Science Communication</a></li> -->
        </ul>
    </div>
    <div style="flex: 1; margin-left: 20px;">
        <h3>Personal</h3>
        <ul style="list-style-type: square;">
            <li><a href="pages/about.html">About Me</a></li>
            <li><a href="pages/trents_book_club.html">Trent's Book Club</a></li>
            <li><a href="pages/art_and_science.html">Art & Science</a></li>
        </ul>
    </div>
</div>

### Contact

Email: [tbthomas@uw.edu](mailto:tbthomas@uw.edu){:target="\_blank"} \
Twitter: [https://twitter.com/trentag0n](https://twitter.com/trentag0n){:target="\_blank"} \
Github: [https://github.com/trentagon](https://github.com/trentagon){:target="\_blank"}

<div style="color: lightgray;">
    The design of this website is inspired by digital brutalism, which emphasizes fast, clear, and memory-efficient user interfaces.
</div>

<script>
  let shapeRadius = 1.5; // Width of the shape
  let orbitRadiusFactor = 1.5;
  let orbitRadius;

  let gridSize = 15;
  let gridShift;
  let xgridCenter;
  let ygridCenter;

  let x;
  let y;

  let c1;
  let c2;

  let numFrames = 200;

  function setup() {
    let canvas = createCanvas(120, 120);
    canvas.parent('p5-sketch-container');
    frameRate(30);
    rectMode(CENTER);
    ellipseMode(RADIUS);
    orbitRadius = orbitRadiusFactor * shapeRadius;
    gridShift = 2 * (orbitRadius + (shapeRadius / 2));
    xgridCenter = ((width - (gridShift * gridSize)) / 2) + (orbitRadius + (shapeRadius / 2));
    ygridCenter = ((height - (gridShift * gridSize)) / 2) + (orbitRadius + (shapeRadius / 2));

    c1 = color(255,255,255);
    c2 = color(0,0,255);
  }

  function draw() {
    background(255);
    noStroke();

    let t = 2.0 * frameCount / numFrames;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {

        x = xgridCenter + (gridShift * i);
        y = ygridCenter + (gridShift * j);

        let distanceFromCenter;
        distanceFromCenter = sqrt(pow((i - (gridSize - 1) / 2), 2) + pow((j - (gridSize - 1) / 2), 2)) / ((gridSize - 1) / 2);

        let centerOffset;
        centerOffset = map(distanceFromCenter, 0, 1, 0, PI);

        let r1;
        r1 = shapeRadius * map(abs(sin(TWO_PI * t - centerOffset)), 0, 1, 2.5, 8);

        let c = lerpColor(c1, c2, map(sin(TWO_PI * t - centerOffset), -1, 1, 0, 1));
        stroke(c2)
        fill(c);

        rect(x, y, r1, r1);

      }
    }
  }

</script>

<style>
    h1.title {
        text-align: center;
        margin-bottom: 5px; /* Adjust margin as needed */
    }
    
    .subtitle {
        text-align: center;
        color: black;
        font-size: 16px; /* Adjust font size as needed */
    }
</style>

---
layout: default
title: Trent B. Thomas
---


# Trent B. Thomas's personal website

Welcome! I am a Ph.D. candidate in the Earth and Space Sciences Department and Astrobiology Program at the [University of Washington](https://ess.uw.edu/people/trent-thomas/){:target="_blank"}.

I study topics related to planetary science, astrobiology, and the evolution of planetary atmospheres. Explore the links below to learn more.

<div style="display: flex; justify-content: space-between;">
    <div style="flex: 1; margin-right: 20px;">
        <h3>Professional</h3>
        <ul style="list-style-type: square;">
            <li><a href="pages/research_interests.html">Research interests</a></li>
            <li><a href="assets/tthomas_cv.pdf" target="_blank">Curriculum Vitae</a></li>
            <li><a href="pages/publications_and_code.html">Publications and code</a></li>
            <li><a href="pages/outreach.html">Outreach</a></li>
        </ul>
    </div>
    <div style="flex: 1; margin-left: 20px;">
        <h3>Personal</h3>
        <ul style="list-style-type: square;">
            <li><a href="pages/about.html">About me</a></li>
            <li><a href="pages/trents_book_club.html">Trent's Book Club</a></li>
            <li><a href="pages/creative_coding.html">Art + Science</a></li>
        </ul>
    </div>
</div>

### Contact

Email: [tbthomas@uw.edu](mailto:tbthomas@uw.edu){:target="_blank"} \
Twitter: [https://twitter.com/trentag0n](https://twitter.com/trentag0n){:target="_blank"} \
Github: [https://github.com/trentagon](https://github.com/trentagon){:target="_blank"}

<div style="color: lightgray;">
    The design of this website is inspired by digital brutalism, which emphasizes fast, clear, and memory-efficient user interfaces.
</div>

<div id="p5-sketch-container">

<!-- Include the p5.js sketch -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js">
    let shapeRadius = 5.0; // Width of the shape
    let orbitRadiusFactor = 1;
    let orbitRadius;

    let gridSize = 25;
    let gridShift;
    let xgridCenter;
    let ygridCenter;

    let x;
    let y;

    let rotationMap = Math.PI / 2;
    let numFrames = 200;

    let c1, c2;

    function setup() {
        let canvas = createCanvas(1080, 1080);
        canvas.parent('p5-sketch-container');
        frameRate(30);
        ellipseMode(RADIUS);

        orbitRadius = orbitRadiusFactor * shapeRadius;
        gridShift = 2 * (orbitRadius + (shapeRadius / 2));
        xgridCenter = ((width - (gridShift * gridSize)) / 2) + (orbitRadius + (shapeRadius / 2));
        ygridCenter = ((height - (gridShift * gridSize)) / 2) + (orbitRadius + (shapeRadius / 2));

        c1 = color(232, 82, 112);
        c2 = color(82, 168, 232);
    }

    function draw() {
        background(255);
        noStroke();

        let t = 2.0 * frameCount / numFrames;

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let yRotationOffset = map(j / (gridSize - 1), 0, 1, 0, rotationMap);
                let xRotationOffset = map(i / (gridSize - 1), 0, 1, 0, rotationMap);

                x = xgridCenter + (gridShift * i);
                y = ygridCenter + (gridShift * j);

                let distanceFromCenter = sqrt(pow((i - (gridSize - 1) / 2), 2) + pow((j - (gridSize - 1) / 2), 2)) / ((gridSize - 1) / 2);
                let centerOffset = map(distanceFromCenter, 0, 1, 0, Math.PI);

                let r1 = shapeRadius * map(abs(sin(TWO_PI * t - centerOffset)), 0, 1, 2.5, 8);
                let c = lerpColor(c1, c2, map(sin(TWO_PI * t - centerOffset), -1, 1, 0, 1));

                fill(c);
                ellipse(x, y, r1, r1);
            }
        }
    }
</script>

</div>

<!-- 
# <span id="title" class="color-animation">Trent B. Thomas's personal website</span> 
<style>
.color-animation {
    animation: colorChange 60s infinite; /* Animation name, duration, and iteration */
}

@keyframes colorChange {
    0% { color: blue; } /* Define colors at different keyframe percentages */
    50% { color: black; }
    100% { color: blue; }
}
</style>
-->
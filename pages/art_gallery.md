---
layout: site
title: Art Gallery
description: "Generative art by Trent Thomas — interactive browser animations exploring the intersection of art, mathematics, and science."
---

# Art Gallery

I am passionate about exploring the intersection of [art and science](https://www.embopress.org/doi/full/10.15252/embr.201847061){:target="\_blank"}. I am particularly interested in generative design, where a work unfolds organically from a set of predetermined conditions. The code for the animations below is running in your browser right now.

<div class="art-grid">

  <div class="art-tile" style="width: 645px;">
    <div class="art-tile-embed">
      <iframe src="{{ '/assets/cb_jsMode/index.html' | relative_url }}" allowfullscreen></iframe>
    </div>
    <p class="art-tile-title">Crystal Bouquet &nbsp;<a href="/assets/cb_jsMode/index.html" target="_blank" style="font-size:0.75rem; font-weight:normal; text-transform:none; letter-spacing:0;">[fullscreen]</a></p>
    <p class="art-tile-caption">Each flower's form, color, and movement is randomly generated endlessly.</p>
  </div>

  <div class="art-tile" style="width: 645px;">
    <div style="width: 645px; height: 645px; overflow: hidden; position: relative; border: 2px solid #000;">
      <iframe src="/assets/capcarb/index.html?embed=true" allowfullscreen
        style="width: 1000px; height: 1000px; border: none;
               transform: scale(0.645); transform-origin: top left;
               pointer-events: auto;"></iframe>
    </div>
    <p class="art-tile-title">Cap Carbonates &nbsp;<a href="/assets/capcarb/index.html" target="_blank" style="font-size:0.75rem; font-weight:normal; text-transform:none; letter-spacing:0;">[fullscreen]</a></p>
    <p class="art-tile-caption">A data sculpture from my research on Snowball Earth. View fullscreen and click for sound.</p>
  </div>

  <div class="art-tile">
    <div style="width: 860px; height: 483px; overflow: hidden; position: relative; border: 2px solid #000;">
      <iframe src="/assets/planet/index.html" allowfullscreen
        style="width: 100%; height: 100%; border: none;
               pointer-events: auto;"></iframe>
    </div>
    <p class="art-tile-title">Planet.Gen &nbsp;<a href="/assets/planet/index.html" target="_blank" style="font-size:0.75rem; font-weight:normal; text-transform:none; letter-spacing:0;">[fullscreen]</a></p>
    <p class="art-tile-caption">Sculpt your own world, or choose from preset solar system bodies and exoplanets. View sideways on mobile.</p>
  </div>

</div>

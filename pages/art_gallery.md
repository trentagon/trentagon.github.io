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
      <iframe src="{{ '/assets/cb_jsMode/index.html' | relative_url }}" allowfullscreen style="pointer-events: none;"></iframe>
    </div>
    <p class="art-tile-title">Crystal Bouquet &nbsp;<a href="/assets/cb_jsMode/index.html" target="_blank" style="font-size:0.75rem; font-weight:normal; text-transform:none; letter-spacing:0;">[fullscreen]</a></p>
    <p class="art-tile-caption">Each flower's form, color, and movement is randomly generated endlessly.</p>
  </div>

  <div class="art-tile" style="width: 645px;">
    <div id="capcarb-container" style="overflow: hidden; position: relative; border: 2px solid #000;">
      <iframe id="capcarb-iframe" src="/assets/capcarb/index.html?embed=true" allowfullscreen
        style="border: none; transform-origin: top left; pointer-events: auto; display: block;"></iframe>
    </div>
    <p class="art-tile-title">Cap Carbonates &nbsp;<a href="/assets/capcarb/index.html" target="_blank" style="font-size:0.75rem; font-weight:normal; text-transform:none; letter-spacing:0;">[fullscreen]</a></p>
    <p class="art-tile-caption">A data sculpture from my research on Snowball Earth. View fullscreen and click for sound.</p>
  </div>

  <div class="art-tile">
    <div class="art-tile-16-9">
      <iframe src="/assets/planet/index.html" allowfullscreen
        style="width: 100%; height: 100%; border: none; background: #000;
               pointer-events: auto;"></iframe>
    </div>
    <p class="art-tile-title">Planet.Gen &nbsp;<a href="/assets/planet/index.html" target="_blank" style="font-size:0.75rem; font-weight:normal; text-transform:none; letter-spacing:0;">[fullscreen]</a></p>
    <p class="art-tile-caption">Sculpt your own world, or choose from preset solar system bodies and exoplanets.</p>
  </div>

</div>

<script>
  function resizeCapcarb() {
    const container = document.getElementById('capcarb-container');
    const iframe = document.getElementById('capcarb-iframe');
    if (!container || !iframe) return;
    const w = container.parentElement.offsetWidth;
    const size = Math.min(w, 645);
    const scale = size / 1000;
    container.style.width = size + 'px';
    container.style.height = size + 'px';
    iframe.style.width = '1000px';
    iframe.style.height = '1000px';
    iframe.style.transform = 'scale(' + scale + ')';
  }
  resizeCapcarb();
  window.addEventListener('resize', resizeCapcarb);
</script>

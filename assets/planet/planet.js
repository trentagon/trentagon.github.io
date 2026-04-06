// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

// Canvas & UI Layout (reference values at full size)
const REF_PANEL_WIDTH = 510;
const REF_PANEL_HEIGHT = 541;
const REF_PANEL_OFFSET_X = 20;
const REF_PANEL_OFFSET_Y = 155;
const CONTROL_PANEL_CENTER_X = 3 / 4;
const CONTROL_PANEL_CENTER_Y = 1 / 2;
const REF_SLIDER_WIDTH = 200;
const REF_BUTTON_WIDTH = 112;
const REF_BUTTON_HEIGHT = 24;
const PRESET_COLUMNS = 4;
const REF_PRESET_GAP_X = 8;
const REF_PRESET_GAP_Y = 8;
const PRESET_START_X = 0;
const REF_PRESET_START_Y = -133;
const REF_UI_FPS_WIDTH = 120;
const UI_FPS_ROW_Y_INSET = 5;
const UI_NOTE_BOTTOM_OFFSET = 4;

// Responsive scaling — UI hides below this width
const MIN_UI_CANVAS_WIDTH = 600;

// Computed scaled values (updated on resize)
let uiScale = 1;
let PANEL_WIDTH = REF_PANEL_WIDTH;
let PANEL_HEIGHT = REF_PANEL_HEIGHT;
let PANEL_OFFSET_X = REF_PANEL_OFFSET_X;
let PANEL_OFFSET_Y = REF_PANEL_OFFSET_Y;
let CONTROL_PANEL_BASE_X_OFFSET = PANEL_WIDTH / 2 - PANEL_OFFSET_X;
let CONTROL_PANEL_BASE_Y_OFFSET = PANEL_HEIGHT / 2 - PANEL_OFFSET_Y;
let SLIDER_WIDTH = REF_SLIDER_WIDTH;
let BUTTON_WIDTH = REF_BUTTON_WIDTH;
let BUTTON_HEIGHT = REF_BUTTON_HEIGHT;
let PRESET_GAP_X = REF_PRESET_GAP_X;
let PRESET_GAP_Y = REF_PRESET_GAP_Y;
let PRESET_START_Y = REF_PRESET_START_Y;
let UI_FPS_WIDTH = REF_UI_FPS_WIDTH;
let UI_NOTE_WIDTH = PANEL_WIDTH;
let uiVisible = true;
const ENABLE_PRESET_EXPORT_HELPER =
  typeof window !== "undefined" && window.PLANET_DEBUG === true;
const EXPORT_BUTTON_WIDTH = 232;
const SKETCH_CONTAINER_ID =
  (typeof window !== "undefined" && window.PLANET_SKETCH_CONTAINER_ID) ||
  "planet-sketch-container";
const PLANET_VIEW_OFFSET_X =
  (typeof window !== "undefined" &&
    typeof window.PLANET_VIEW_OFFSET_X === "number" &&
    Number.isFinite(window.PLANET_VIEW_OFFSET_X) &&
    window.PLANET_VIEW_OFFSET_X >= -1 &&
    window.PLANET_VIEW_OFFSET_X <= 1 &&
    window.PLANET_VIEW_OFFSET_X) ||
  -1 / 6;
// Presets were tuned at this canvas width. Rendering uses this as a reference so
// visuals stay consistent when embedded in smaller/larger containers (e.g. iframe).
const REFERENCE_CANVAS_WIDTH = 1728;
const REFERENCE_SIZE_DEFAULT = REFERENCE_CANVAS_WIDTH / 6;
const REFERENCE_SIZE_MAX = (REFERENCE_CANVAS_WIDTH / 5) * 0.9;
const REFERENCE_MOUNTAIN_MAX = REFERENCE_CANVAS_WIDTH / 10;

// UI Column Configuration
const LEFT_COLUMN_KEYS = [
  "size",
  "rotation",
  "obliquity",
  "landRatio",
  "mountainHeight",
  "plateTectonics",
  "volcanism",
  "magneticIntensity",
];
const RIGHT_COLUMN_KEYS = [
  "polygonRes",
  "scaleHeight",
  "atmosphereOpacity",
  "atmosphericEscape",
  "cloudFraction",
  "cloudCirculation",
  "polarCaps",
  "biosphere",
];
const REF_COLUMN_OFFSET = 250;
const REF_Y_OFFSETS = [32, 78, 124, 170, 216, 262, 308, 354];
const REF_LABEL_Y_OFFSETS = [14, 60, 106, 152, 198, 244, 290, 336];
let COLUMN_OFFSET = REF_COLUMN_OFFSET;
let Y_OFFSETS = REF_Y_OFFSETS;
let LABEL_Y_OFFSETS = REF_LABEL_Y_OFFSETS;

// Slider Configuration: [min, max, default, step]
const SLIDER_CONFIGS = {
  size: [75, REFERENCE_SIZE_MAX, REFERENCE_SIZE_DEFAULT, 0],
  polygonRes: [10, 80, 80, 5],
  rotation: [-0.08, 0.08, 0, 0.0005],
  obliquity: [0, 90, 20, 1],
  landRatio: [0, 1, 0.5, 0.01],
  mountainHeight: [0, REFERENCE_MOUNTAIN_MAX, 50, 1],
  plateTectonics: [0, 0.0125, 0, 0.0001],
  scaleHeight: [1.0, 1.725, 1.15, 0.01],
  atmosphereOpacity: [0, 1, 0.3, 0.01],
  cloudFraction: [0.25, 0.8, 0.4, 0.01],
  cloudCirculation: [0, 0.0125, 0, 0.0001],
  polarCaps: [0, 1, 0.2, 0.01],
  magneticIntensity: [0, 1, 0, 0.01],
  biosphere: [0, 1, 0.3, 0.01],
  atmosphericEscape: [0, 1, 0, 0.01],
  volcanism: [0, 1, 0, 0.01],
};

const LABEL_CONFIGS = {
  size: "Radius",
  polygonRes: "Polygons",
  rotation: "Rotation Rate",
  obliquity: "Obliquity",
  landRatio: "Land Fraction",
  mountainHeight: "Topography",
  plateTectonics: "Plate Tectonics",
  scaleHeight: "Atm. Scale Height",
  atmosphereOpacity: "Atm. Opacity",
  cloudFraction: "Cloud Fraction",
  cloudCirculation: "Cloud Circulation",
  polarCaps: "Polar Caps",
  magneticIntensity: "Magnetic Field",
  biosphere: "Biosphere",
  atmosphericEscape: "Atm. Escape",
  volcanism: "Volcanism",
};

const PRESET_BUTTONS = [
  { key: "random", label: "Random" },
  { key: "earth", label: "Earth" },
  { key: "mars", label: "Mars" },
  { key: "ancient_mars", label: "Ancient Mars" },
  { key: "venus", label: "Venus" },
  { key: "mercury", label: "Mercury" },
  { key: "enceladus", label: "Enceladus" },
  { key: "europa", label: "Europa" },
  { key: "titan", label: "Titan" },
  { key: "io", label: "Io" },
  { key: "trappist_1e", label: "TRAPPIST-1 e" },
  { key: "trappist_1b", label: "TRAPPIST-1 b" },
  { key: "l_98_59_b", label: "L 98-59 b" },
  { key: "cancri_55_e", label: "55 Cnc e" },
];

// Terrain & Noise Generation
const NOISE_SCALE = 2;
const NOISE_DRIFT_SCALE_Y = 0.7;
const NOISE_DRIFT_SCALE_Z = 0.4;
// Terrain Thresholds
const OCEAN_DEEP_THRESHOLD = 0.5;
const OCEAN_MID_THRESHOLD = 0.9;
const POLAR_CAP_SOFTNESS = 0.1;

// UI controls
const ui = {
  fps: null,
  scaleNote: null,
  exportPresetButton: null,
  exportPresetStatus: null,
  presetButtons: {},
  activePresetKey: "earth",
  sliders: {
    size: null,
    rotation: null,
    polygonRes: null,
    obliquity: null,
    landRatio: null,
    mountainHeight: null,
    plateTectonics: null,
    scaleHeight: null,
    atmosphereOpacity: null,
    cloudFraction: null,
    cloudCirculation: null,
    polarCaps: null,
    magneticIntensity: null,
    biosphere: null,
    atmosphericEscape: null,
    volcanism: null,
  },
  labels: {
    palette: null,
    size: null,
    rotation: null,
    polygonRes: null,
    obliquity: null,
    landRatio: null,
    mountainHeight: null,
    plateTectonics: null,
    scaleHeight: null,
    atmosphereOpacity: null,
    cloudFraction: null,
    cloudCirculation: null,
    polarCaps: null,
    magneticIntensity: null,
    biosphere: null,
    atmosphericEscape: null,
    volcanism: null,
  },
};

// Parameter values
const params = {
  sphereSize: 150,
  effectiveSphereSize: 150,
  renderScale: 1,
  polygonRes: 80,
  rotationRate: 0.01,
  landRatio: 0.3,
  mountainHeight: 20,
  obliquity: 20,
  magneticIntensity: 0,
  scaleHeight: 1.15,
  atmosphereOpacity: 0.3,
  cloudFraction: 0.4,
  cloudCirculation: 0.01,
  polarCaps: 0.2,
  biosphere: 0.3,
  atmosphericEscape: 0,
  volcanism: 0,
  noiseTime: 0,
  noiseDriftSpeed: 0.005,
  cloudTime: 0,
  rotationAngle: 0,
  volcanismTime: 0,
  bioTime: 0,
  noiseOffsetX: 0,
  noiseOffsetY: 0,
  // Per-frame caches computed once in updateParameters
  landThreshold: 0.5,
  topographyRatio: 0,
};

// Colors
const colors = {
  oceanDeep: [0, 0, 0],
  ocean: [0, 0, 0],
  oceanShallow: [0, 0, 0],
  beach: [0, 0, 0],
  grass: [20, 80, 20],
  mountain: [0, 0, 0],
  atmosphere: [100, 150, 255],
  clouds: [255, 255, 255],
  magneticField: [255, 255, 255],
  polarCap: [240, 245, 255],
  lavaCore: [255, 140, 0],
  lavaEdge: [200, 60, 0],
  biosphereColors: [
    [255, 0, 0],
    [255, 255, 0],
    [0, 0, 255],
  ],
  palette: "earth",
};

let planetMesh = null;
let hotspots = []; // { lon, phi, phase, hx, hy, hz } — stable per planet seed
let volcanismCache = {
  activeCount: 0,
  cosInfluence: 0,
  pulses: [],
  unitVecs: [],
};
let lastMeshParams = {
  sphereSize: null,
  noiseTime: null,
  landRatio: null,
  mountainHeight: null,
  polygonRes: null,
};

// Cloud mesh cache — split into a static grid (positions + baked warp coords,
// regenerated only when polygon resolution changes) and a per-frame Float32Array
// of noise values (1 noise call/vertex instead of 3).
let cloudMesh = null;
let lastCloudSegX = null;
let lastCloudSegY = null;

// Pre-allocated flat vertex array for the planet mesh. Reused every frame so
// generatePlanetMesh never touches the GC when running with plate tectonics active.
// Reallocated only when polygon resolution changes.
let _planetVertexPool = null;

// Halo cell cache — the per-cell static data (position, normalised distance, angular
// speed variation noise, pre-multiplied noise coords, Bayer indices) is computed
// once and stored here. Rebuilt only when innerRadius/outerRadius/cellSize changes.
let _haloCache = null;
let _haloCacheKey = { innerRadius: -1, outerRadius: -1, cellSize: -1 };
let _canvasRenderer = null;
let _lastFpsUpdate = 0;
let _lastFpsValue = 0;

// ============================================================================
// INITIALIZATION & SETUP
// ============================================================================

function updateUIScale(canvasWidth) {
  if (canvasWidth < MIN_UI_CANVAS_WIDTH) {
    uiVisible = false;
    uiScale = 1;
  } else {
    uiVisible = true;
    uiScale = Math.min(1, canvasWidth / REFERENCE_CANVAS_WIDTH);
  }
  PANEL_WIDTH = Math.round(REF_PANEL_WIDTH * uiScale);
  PANEL_HEIGHT = Math.round(REF_PANEL_HEIGHT * uiScale);
  PANEL_OFFSET_X = Math.round(REF_PANEL_OFFSET_X * uiScale);
  PANEL_OFFSET_Y = Math.round(REF_PANEL_OFFSET_Y * uiScale);
  CONTROL_PANEL_BASE_X_OFFSET = PANEL_WIDTH / 2 - PANEL_OFFSET_X;
  CONTROL_PANEL_BASE_Y_OFFSET = PANEL_HEIGHT / 2 - PANEL_OFFSET_Y;
  SLIDER_WIDTH = Math.round(REF_SLIDER_WIDTH * uiScale);
  BUTTON_WIDTH = Math.round(REF_BUTTON_WIDTH * uiScale);
  BUTTON_HEIGHT = Math.round(REF_BUTTON_HEIGHT * uiScale);
  PRESET_GAP_X = Math.round(REF_PRESET_GAP_X * uiScale);
  PRESET_GAP_Y = Math.round(REF_PRESET_GAP_Y * uiScale);
  PRESET_START_Y = Math.round(REF_PRESET_START_Y * uiScale);
  UI_FPS_WIDTH = Math.round(REF_UI_FPS_WIDTH * uiScale);
  UI_NOTE_WIDTH = PANEL_WIDTH;
  COLUMN_OFFSET = Math.round(REF_COLUMN_OFFSET * uiScale);
  Y_OFFSETS = REF_Y_OFFSETS.map(v => Math.round(v * uiScale));
  LABEL_Y_OFFSETS = REF_LABEL_Y_OFFSETS.map(v => Math.round(v * uiScale));
  // Update thumb size CSS variable
  const thumbW = Math.max(6, Math.round(10 * uiScale));
  const thumbH = Math.max(8, Math.round(14 * uiScale));
  document.documentElement.style.setProperty('--thumb-w', thumbW + 'px');
  document.documentElement.style.setProperty('--thumb-h', thumbH + 'px');
}

function setup() {
  // Force opaque WebGL output so atmospheric alpha blends are consistent
  // across full-page and embedded/container rendering.
  setAttributes("alpha", false);
  const { width: canvasWidth, height: canvasHeight } = getSketchDimensions();
  updateUIScale(canvasWidth);
  _canvasRenderer = createCanvas(canvasWidth, canvasHeight, WEBGL);
  const container = getSketchContainer();
  if (container) {
    _canvasRenderer.parent(container);
  }
  initializeUI();
  applyEarthPreset();
  generateInitialMesh();
}

function getSketchContainer() {
  return document.getElementById(SKETCH_CONTAINER_ID);
}

function getSketchDimensions() {
  const container = getSketchContainer();
  if (!container) {
    return { width: windowWidth, height: windowHeight };
  }

  const rect = container.getBoundingClientRect();
  return {
    width: Math.max(1, Math.floor(container.clientWidth || rect.width)),
    height: Math.max(1, Math.floor(container.clientHeight || rect.height)),
  };
}

function getControlPanelBasePosition() {
  const rawX = width * CONTROL_PANEL_CENTER_X - CONTROL_PANEL_BASE_X_OFFSET;
  // Clamp so the panel right edge never exceeds canvas width
  const maxX = width - PANEL_WIDTH + PANEL_OFFSET_X - 4;
  return {
    x: Math.min(rawX, maxX),
    y: height * CONTROL_PANEL_CENTER_Y - CONTROL_PANEL_BASE_Y_OFFSET,
  };
}

function attachUIElement(element) {
  const container = getSketchContainer();
  if (container) {
    element.parent(container);
  }
  element.style("position", "absolute");
}

function initializeUI() {
  const { x: baseX, y: baseY } = getControlPanelBasePosition();
  // FPS tracker (HTML element)
  ui.fps = createP("FPS:");
  attachUIElement(ui.fps);
  styleLabel(ui.fps);
  ui.fps.style("font-family", "Arial, Helvetica, sans-serif");
  ui.fps.style("font-size", Math.round(14 * uiScale) + "px");
  ui.fps.style("width", UI_FPS_WIDTH + "px");
  ui.fps.style("text-align", "right");

  ui.scaleNote = createP(
    "This animation was created by Trent Thomas using p5.js. Slider values are not to scale, and they prioritize aesthetics over scientific accuracy.",
  );
  attachUIElement(ui.scaleNote);
  styleLabel(ui.scaleNote);
  ui.scaleNote.style("font-size", Math.round(12 * uiScale) + "px");
  ui.scaleNote.style("line-height", "1.2");
  ui.scaleNote.style("font-family", "Arial, Helvetica, sans-serif");
  ui.scaleNote.style("text-align", "center");
  ui.scaleNote.style("width", UI_NOTE_WIDTH + "px");
  ui.scaleNote.style("opacity", "0.75");

  positionPanelMeta(baseX, baseY);

  // Preset controls
  createPresetButtons(baseX, baseY);
  createPresetExportHelper(baseX, baseY);

  // Create left column sliders
  createColumnSliders(LEFT_COLUMN_KEYS, baseX, baseY);

  // Create right column sliders
  createColumnSliders(RIGHT_COLUMN_KEYS, baseX + COLUMN_OFFSET, baseY);

  // Hide UI on small screens
  applyUIVisibility();
}

function createPresetButtons(baseX, baseY) {
  PRESET_BUTTONS.forEach(({ key, label }, index) => {
    if (!ui.presetButtons[key]) {
      const button = createButton(label.toUpperCase());
      attachUIElement(button);
      styleButton(button);
      button.mousePressed(() => applyPreset(key));
      ui.presetButtons[key] = button;
    }

    const col = index % PRESET_COLUMNS;
    const row = Math.floor(index / PRESET_COLUMNS);
    const x = baseX + PRESET_START_X + col * (BUTTON_WIDTH + PRESET_GAP_X);
    const y = baseY + PRESET_START_Y + row * (BUTTON_HEIGHT + PRESET_GAP_Y);
    positionElement(ui.presetButtons[key], x, y);
  });
}

function createPresetExportHelper(baseX, baseY) {
  if (!ENABLE_PRESET_EXPORT_HELPER) return;

  if (!ui.exportPresetButton) {
    ui.exportPresetButton = createButton("Export Active Preset");
    attachUIElement(ui.exportPresetButton);
    styleButton(ui.exportPresetButton);
    ui.exportPresetButton.style("width", EXPORT_BUTTON_WIDTH + "px");
    ui.exportPresetButton.style("font-size", "12px");
    ui.exportPresetButton.mousePressed(exportActivePresetBlock);
  }

  if (!ui.exportPresetStatus) {
    ui.exportPresetStatus = createP("");
    attachUIElement(ui.exportPresetStatus);
    styleLabel(ui.exportPresetStatus);
    ui.exportPresetStatus.style("font-size", "11px");
    ui.exportPresetStatus.style("color", "#bbbbbb");
  }

  positionPresetExportHelper(baseX, baseY);
}

function positionPresetExportHelper(baseX, baseY) {
  if (!ENABLE_PRESET_EXPORT_HELPER) return;
  if (!ui.exportPresetButton || !ui.exportPresetStatus) return;

  const x = baseX + PRESET_START_X;
  const buttonY = baseY + PRESET_START_Y - 56;
  const statusY = buttonY - 16;

  positionElement(ui.exportPresetButton, x, buttonY);
  positionElement(ui.exportPresetStatus, x, statusY);
}

function createColumnSliders(columnKeys, baseX, baseY) {
  for (let i = 0; i < columnKeys.length; i++) {
    const key = columnKeys[i];
    const config = SLIDER_CONFIGS[key];
    const [min, max, defaultVal, step] = config;
    // Cache min/max/default values if they are functions
    const minVal = typeof min === "function" ? min() : min;
    const maxVal = typeof max === "function" ? max() : max;
    const defVal = typeof defaultVal === "function" ? defaultVal() : defaultVal;

    // Only create slider if not already present
    if (!ui.sliders[key]) {
      const slider = createSlider(minVal, maxVal, defVal, step);
      attachUIElement(slider);
      const yPos = baseY + Y_OFFSETS[i];
      positionElement(slider, baseX, yPos);
      styleSlider(slider);
      ui.sliders[key] = slider;
    }

    // Only create label if not already present
    if (!ui.labels[key]) {
      const label = createP(LABEL_CONFIGS[key].toUpperCase());
      attachUIElement(label);
      const labelYPos = baseY + LABEL_Y_OFFSETS[i];
      positionElement(label, baseX, labelYPos);
      styleLabel(label);
      ui.labels[key] = label;
    }
  }
}

function generateInitialMesh() {
  params.noiseOffsetX = random(1000);
  params.noiseOffsetY = random(1000);

  // Generate stable hotspot positions seeded from planet noise offsets
  hotspots.length = 0;
  const MAX_HOTSPOTS = 18;
  const offsetX = params.noiseOffsetX;
  const offsetY = params.noiseOffsetY;
  for (let i = 0; i < MAX_HOTSPOTS; i++) {
    const lon = noise(offsetX + i * 3.7, 0) * TWO_PI;
    const phi = noise(0, offsetY + i * 2.3) * PI;
    const phaseNoise = noise(
      offsetX * 7.3 + i * 91.4,
      offsetY * 5.1 + i * 47.9,
    );
    hotspots.push({
      lon,
      phi,
      phase: (i / MAX_HOTSPOTS) * TWO_PI + phaseNoise * 1.2,
      hx: Math.sin(phi) * Math.cos(lon),
      hy: Math.cos(phi),
      hz: Math.sin(phi) * Math.sin(lon),
    });
  }

  planetMesh = generatePlanetMesh(
    params.sphereSize,
    params.polygonRes,
    Math.round(params.polygonRes * 0.75),
  );
}

function draw() {
  // Update FPS tracker HTML element every 0.5 seconds
  if (ui.fps) {
    const now = millis();
    if (now - _lastFpsUpdate > 500) {
      _lastFpsValue = frameRate().toFixed(1);
      _lastFpsUpdate = now;
    }
    ui.fps.html("FPS: " + _lastFpsValue);
  }
  background(0);
  updateParameters();
  const dtNorm = deltaTime / 16.667; // normalise to 60fps
  params.noiseTime += params.noiseDriftSpeed * dtNorm;
  params.cloudTime += params.cloudCirculation * dtNorm;
  params.rotationAngle += params.rotationRate * dtNorm;
  params.volcanismTime += 0.02 * dtNorm;
  params.bioTime += 0.04 * dtNorm;

  // Precompute per-frame volcanism values so getVertexColor does zero trig
  if (params.volcanism > 0) {
    const activeCount = Math.max(1, Math.round(params.volcanism * 18));
    const influenceAngle = 0.05 + params.volcanism * 0.5;
    volcanismCache.activeCount = activeCount;
    volcanismCache.cosInfluence = Math.cos(influenceAngle);
    volcanismCache.looseCosThreshold = volcanismCache.cosInfluence - 0.45;
    // Drift hotspot positions with noiseTime to match terrain plate movement
    const lonDrift = params.noiseTime * NOISE_SCALE;
    const phiDrift = params.noiseTime * NOISE_DRIFT_SCALE_Y * 0.3;
    for (let i = 0; i < activeCount; i++) {
      volcanismCache.pulses[i] =
        0.7 + 0.3 * Math.sin(params.volcanismTime * 1.0 + hotspots[i].phase);
      const dLon = hotspots[i].lon + lonDrift;
      const dPhi = hotspots[i].phi + phiDrift;
      // Reuse existing object slot if present, otherwise create it once
      if (!volcanismCache.unitVecs[i]) {
        volcanismCache.unitVecs[i] = { hx: 0, hy: 0, hz: 0 };
      }
      volcanismCache.unitVecs[i].hx = Math.sin(dPhi) * Math.cos(dLon);
      volcanismCache.unitVecs[i].hy = Math.cos(dPhi);
      volcanismCache.unitVecs[i].hz = Math.sin(dPhi) * Math.sin(dLon);
    }
  } else {
    volcanismCache.activeCount = 0;
  }

  // Only regenerate mesh if relevant parameters changed
  if (
    lastMeshParams.sphereSize !== params.effectiveSphereSize ||
    lastMeshParams.noiseTime !== params.noiseTime ||
    lastMeshParams.landRatio !== params.landRatio ||
    lastMeshParams.mountainHeight !== params.mountainHeight ||
    lastMeshParams.polygonRes !== params.polygonRes
  ) {
    planetMesh = generatePlanetMesh(
      params.effectiveSphereSize,
      params.polygonRes,
      Math.round(params.polygonRes * 0.75),
      params.noiseTime,
    );
    lastMeshParams.sphereSize = params.effectiveSphereSize;
    lastMeshParams.noiseTime = params.noiseTime;
    lastMeshParams.landRatio = params.landRatio;
    lastMeshParams.mountainHeight = params.mountainHeight;
    lastMeshParams.polygonRes = params.polygonRes;
  }

  // Color each unique vertex exactly once this frame.
  // drawPlanetMesh will read the cached cr/cg/cb instead of recomputing.
  colorPlanetVertices(planetMesh);

  drawUIPanel();

  // Use orthographic camera to eliminate perspective distortion
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 2000);

  translate(width * (uiVisible ? PLANET_VIEW_OFFSET_X : 0), 0, 0);

  // Draw halo first in 3D (no rotation) so planet depth-tests in front of it
  drawAtmosphericEscapeHalo(params.effectiveSphereSize);

  rotateZ(radians(params.obliquity));
  rotateY(params.rotationAngle);
  drawPlanetMesh(planetMesh);
  drawClouds(params.effectiveSphereSize);
  drawBiosphereParticles(params.effectiveSphereSize);
  drawMagneticField(params.effectiveSphereSize);
  drawAtmosphere(params.effectiveSphereSize);
}

function updateParameters() {
  params.sphereSize = ui.sliders.size.value();
  params.rotationRate = ui.sliders.rotation.value();
  params.landRatio = ui.sliders.landRatio.value();
  params.mountainHeight = ui.sliders.mountainHeight.value();
  params.noiseDriftSpeed = ui.sliders.plateTectonics.value();
  params.obliquity = ui.sliders.obliquity.value();
  params.magneticIntensity = ui.sliders.magneticIntensity.value();
  params.scaleHeight = ui.sliders.scaleHeight.value();
  params.atmosphereOpacity = ui.sliders.atmosphereOpacity.value();
  params.cloudFraction = ui.sliders.cloudFraction.value();
  params.cloudCirculation = ui.sliders.cloudCirculation.value();
  params.polarCaps = ui.sliders.polarCaps.value();
  params.biosphere = ui.sliders.biosphere.value();
  params.atmosphericEscape = ui.sliders.atmosphericEscape.value();
  params.polygonRes = ui.sliders.polygonRes.value();
  params.volcanism = ui.sliders.volcanism.value();
  // Per-frame derived caches
  // Scale planet to fit smaller canvases while keeping atmosphere opacity correct.
  // At REFERENCE_CANVAS_WIDTH the max planet diameter (with atmosphere) is roughly
  // REFERENCE_SIZE_MAX * 2.5. Scale so the planet fits in the smaller canvas dimension.
  const fitDim = uiVisible ? Math.min(width * 0.45, height * 0.85) : Math.min(width, height) * 0.85;
  const refFit = REFERENCE_SIZE_MAX * 2.5;
  params.renderScale = Math.min(1, fitDim / refFit);
  params.effectiveSphereSize = params.sphereSize * params.renderScale;
  params.landThreshold = 1 - params.landRatio;
  params.topographyRatio = params.mountainHeight / REFERENCE_MOUNTAIN_MAX;
}

function drawUIPanel() {
  if (!uiVisible) return;
  const { x: baseX, y: baseY } = getControlPanelBasePosition();
  push();
  translate(-width / 2, -height / 2, 0);
  fill(0);
  stroke(255);
  strokeWeight(2);
  rect(
    baseX - PANEL_OFFSET_X,
    baseY - PANEL_OFFSET_Y,
    PANEL_WIDTH,
    PANEL_HEIGHT,
  );
  pop();
}

function positionElement(element, x, y) {
  element.position(x, y);
}

// ============================================================================
// UI STYLING & UTILITIES
// ============================================================================

function styleSlider(slider) {
  slider.style("width", SLIDER_WIDTH + "px");
  slider.style("-webkit-appearance", "none");
  slider.style("appearance", "none");
  slider.style("background", "white");
  slider.style("outline", "none");
  slider.style("height", Math.max(2, Math.round(4 * uiScale)) + "px");
  slider.style("border-radius", "0");
}

function styleLabel(label) {
  label.style("font-family", "Arial, Helvetica, sans-serif");
  label.style("font-size", Math.round(14 * uiScale) + "px");
  label.style("line-height", "1");
  label.style("margin", "0");
  label.style("color", "white");
}

function styleButton(button) {
  button.style("width", BUTTON_WIDTH + "px");
  button.style("height", BUTTON_HEIGHT + "px");
  button.style("font-family", "Arial, Helvetica, sans-serif");
  button.style("font-size", Math.round(11 * uiScale) + "px");
  button.style("color", "black");
  button.style("background", "white");
  button.style("border", "1px solid white");
  button.style("border-radius", "0");
  button.style("font-weight", "normal");
}

// ============================================================================
// WINDOW RESIZE HANDLING
// ============================================================================

function windowResized() {
  const { width: canvasWidth, height: canvasHeight } = getSketchDimensions();
  updateUIScale(canvasWidth);
  if (canvasWidth !== width || canvasHeight !== height) {
    resizeCanvas(canvasWidth, canvasHeight);
  }
  applyUIVisibility();
  if (uiVisible) {
    restyleAllUI();
    positionUIElements();
  }
}

function applyUIVisibility() {
  const displayVal = uiVisible ? "block" : "none";
  const allElements = [
    ui.fps, ui.scaleNote,
    ...Object.values(ui.presetButtons),
    ...Object.values(ui.sliders).filter(Boolean),
    ...Object.values(ui.labels).filter(Boolean),
  ];
  if (ui.exportPresetButton) allElements.push(ui.exportPresetButton);
  if (ui.exportPresetStatus) allElements.push(ui.exportPresetStatus);
  allElements.forEach(el => { if (el) el.style("display", displayVal); });
}

function restyleAllUI() {
  Object.values(ui.sliders).forEach(s => { if (s) styleSlider(s); });
  Object.values(ui.labels).forEach(l => { if (l) styleLabel(l); });
  Object.values(ui.presetButtons).forEach(b => { if (b) styleButton(b); });
  if (ui.fps) {
    ui.fps.style("font-size", Math.round(14 * uiScale) + "px");
    ui.fps.style("width", UI_FPS_WIDTH + "px");
  }
  if (ui.scaleNote) {
    ui.scaleNote.style("font-size", Math.round(12 * uiScale) + "px");
    ui.scaleNote.style("width", UI_NOTE_WIDTH + "px");
  }
}

function positionUIElements() {
  const { x: baseX, y: baseY } = getControlPanelBasePosition();
  positionPanelMeta(baseX, baseY);

  // Reposition preset controls
  createPresetButtons(baseX, baseY);
  positionPresetExportHelper(baseX, baseY);

  // Reposition left column
  repositionColumnSliders(LEFT_COLUMN_KEYS, baseX, baseY);

  // Reposition right column
  repositionColumnSliders(RIGHT_COLUMN_KEYS, baseX + COLUMN_OFFSET, baseY);
}

function repositionColumnSliders(columnKeys, baseX, baseY) {
  columnKeys.forEach((key, index) => {
    positionElement(ui.sliders[key], baseX, baseY + Y_OFFSETS[index]);
    positionElement(ui.labels[key], baseX, baseY + LABEL_Y_OFFSETS[index]);
  });
}

function positionPanelMeta(baseX, baseY) {
  const panelLeft = baseX - PANEL_OFFSET_X;
  const buttonGridRight =
    baseX +
    PRESET_START_X +
    PRESET_COLUMNS * BUTTON_WIDTH +
    (PRESET_COLUMNS - 1) * PRESET_GAP_X;
  const panelBottom = baseY - PANEL_OFFSET_Y + PANEL_HEIGHT;

  if (ui.fps) {
    const presetRows = Math.ceil(PRESET_BUTTONS.length / PRESET_COLUMNS);
    const lastPresetRowY =
      baseY +
      PRESET_START_Y +
      (presetRows - 1) * (BUTTON_HEIGHT + PRESET_GAP_Y);
    positionElement(
      ui.fps,
      buttonGridRight - UI_FPS_WIDTH,
      lastPresetRowY + UI_FPS_ROW_Y_INSET,
    );
  }
  if (ui.scaleNote) {
    positionElement(
      ui.scaleNote,
      panelLeft + (PANEL_WIDTH - UI_NOTE_WIDTH) / 2,
      panelBottom + UI_NOTE_BOTTOM_OFFSET,
    );
  }
}

// ============================================================================
// COLOR MANAGEMENT
// ============================================================================

function radiusToSizeSlider(earthRadiusRatio) {
  return REFERENCE_SIZE_DEFAULT * Math.sqrt(earthRadiusRatio);
}

function mountainScale(factor) {
  return REFERENCE_CANVAS_WIDTH * factor;
}

const PLANET_PRESETS = {
  earth: {
    sliders: {
      size: 233.28,
      polygonRes: 80,
      rotation: 0.02,
      obliquity: 23,
      landRatio: 0.45,
      mountainHeight: 58,
      plateTectonics: 0.0038,
      scaleHeight: 1.25,
      atmosphereOpacity: 0.38,
      cloudFraction: 0.44,
      cloudCirculation: 0.0025,
      polarCaps: 0.14,
      magneticIntensity: 0.54,
      biosphere: 0.7,
      atmosphericEscape: 0.06,
      volcanism: 0.16,
    },
    palette: {
      oceanDeep: [8, 53, 122],
      ocean: [20, 96, 173],
      oceanShallow: [72, 154, 213],
      beach: [214, 190, 133],
      grass: [45, 122, 58],
      mountain: [118, 114, 112],
      atmosphere: [120, 170, 255],
      clouds: [255, 255, 255],
      magneticField: [255, 255, 255],
      polarCap: [245, 248, 255],
      lavaCore: [255, 140, 0],
      lavaEdge: [200, 60, 0],
      biosphereColors: [
        [255, 110, 100],
        [255, 230, 120],
        [120, 170, 255],
      ],
    },
  },
  mars: {
    sliders: {
      size: 210.062390731897,
      polygonRes: 80,
      rotation: 0.0195,
      obliquity: 25,
      landRatio: 1,
      mountainHeight: 35,
      plateTectonics: 0.0002,
      scaleHeight: 1.2,
      atmosphereOpacity: 0.12,
      cloudFraction: 0.38,
      cloudCirculation: 0.0009,
      polarCaps: 0.23,
      magneticIntensity: 0.04,
      biosphere: 0,
      atmosphericEscape: 0.55,
      volcanism: 0.06,
    },
    palette: {
      oceanDeep: [42, 20, 14],
      ocean: [85, 42, 30],
      oceanShallow: [132, 78, 56],
      beach: [194, 140, 91],
      grass: [171, 98, 69],
      mountain: [150, 111, 95],
      atmosphere: [219, 170, 138],
      clouds: [186, 140, 96],
      magneticField: [210, 170, 150],
      polarCap: [244, 246, 252],
      lavaCore: [255, 130, 25],
      lavaEdge: [198, 58, 18],
      biosphereColors: [
        [214, 126, 95],
        [232, 188, 120],
        [180, 140, 115],
      ],
    },
  },
  ancient_mars: {
    sliders: {
      size: 210.062390731897,
      polygonRes: 80,
      rotation: 0.0195,
      obliquity: 25,
      landRatio: 0.68,
      mountainHeight: 50,
      plateTectonics: 0.0008,
      scaleHeight: 1.31,
      atmosphereOpacity: 0.37,
      cloudFraction: 0.42,
      cloudCirculation: 0.0028,
      polarCaps: 0.18,
      magneticIntensity: 0.45,
      biosphere: 0.08,
      atmosphericEscape: 0.18,
      volcanism: 0.22,
    },
    palette: {
      oceanDeep: [10, 45, 95],
      ocean: [28, 92, 158],
      oceanShallow: [86, 148, 208],
      beach: [208, 152, 122],
      grass: [170, 98, 82],
      mountain: [145, 88, 78],
      atmosphere: [184, 154, 136],
      clouds: [240, 234, 223],
      magneticField: [180, 205, 240],
      polarCap: [245, 248, 255],
      lavaCore: [255, 132, 30],
      lavaEdge: [204, 62, 22],
      biosphereColors: [
        [95, 168, 152],
        [120, 140, 95],
        [212, 175, 110],
      ],
    },
  },
  venus: {
    sliders: {
      size: () => radiusToSizeSlider(0.949),
      polygonRes: 80,
      rotation: -0.0005,
      obliquity: 3,
      landRatio: 0.98,
      mountainHeight: () => mountainScale(0.018),
      plateTectonics: 0,
      scaleHeight: 1.38,
      atmosphereOpacity: 0.96,
      cloudFraction: 0.95,
      cloudCirculation: 0.008,
      polarCaps: 0,
      magneticIntensity: 0.02,
      biosphere: 0,
      atmosphericEscape: 0.08,
      volcanism: 0.25,
    },
    palette: {
      oceanDeep: [58, 51, 43],
      ocean: [92, 82, 60],
      oceanShallow: [141, 120, 85],
      beach: [194, 165, 113],
      grass: [188, 148, 92],
      mountain: [158, 126, 90],
      atmosphere: [245, 206, 123],
      clouds: [255, 239, 171],
      magneticField: [220, 190, 130],
      polarCap: [246, 226, 174],
      lavaCore: [255, 155, 45],
      lavaEdge: [210, 78, 30],
      biosphereColors: [
        [255, 195, 120],
        [245, 170, 98],
        [230, 145, 84],
      ],
    },
  },
  mercury: {
    sliders: {
      size: 178.234542106742,
      polygonRes: 80,
      rotation: 0.0055,
      obliquity: 2,
      landRatio: 1,
      mountainHeight: 35,
      plateTectonics: 0,
      scaleHeight: 1,
      atmosphereOpacity: 0,
      cloudFraction: 0.25,
      cloudCirculation: 0,
      polarCaps: 0,
      magneticIntensity: 0.08,
      biosphere: 0,
      atmosphericEscape: 0.85,
      volcanism: 0,
    },
    palette: {
      oceanDeep: [30, 30, 33],
      ocean: [60, 60, 63],
      oceanShallow: [96, 96, 100],
      beach: [136, 132, 125],
      grass: [129, 126, 120],
      mountain: [167, 162, 152],
      atmosphere: [174, 174, 182],
      clouds: [202, 202, 210],
      magneticField: [170, 200, 255],
      polarCap: [224, 224, 228],
      lavaCore: [255, 150, 40],
      lavaEdge: [198, 70, 28],
      biosphereColors: [
        [180, 180, 180],
        [160, 160, 160],
        [140, 140, 140],
      ],
    },
  },
  enceladus: {
    sliders: {
      size: 137.881869904891,
      polygonRes: 80,
      rotation: 0.0145,
      obliquity: 0,
      landRatio: 0.86,
      mountainHeight: 38,
      plateTectonics: 0.0022,
      scaleHeight: 1.01,
      atmosphereOpacity: 0.03,
      cloudFraction: 0.25,
      cloudCirculation: 0,
      polarCaps: 0,
      magneticIntensity: 0,
      biosphere: 0.08,
      atmosphericEscape: 0.35,
      volcanism: 0.72,
    },
    palette: {
      oceanDeep: [25, 55, 90],
      ocean: [45, 95, 145],
      oceanShallow: [90, 145, 190],
      beach: [195, 220, 235],
      grass: [211, 236, 245],
      mountain: [236, 246, 252],
      atmosphere: [182, 222, 255],
      clouds: [245, 252, 255],
      magneticField: [210, 235, 255],
      polarCap: [255, 255, 255],
      lavaCore: [125, 190, 255],
      lavaEdge: [70, 130, 215],
      biosphereColors: [
        [150, 220, 255],
        [210, 245, 255],
        [120, 180, 235],
      ],
    },
  },
  europa: {
    sliders: {
      size: 142.552727087208,
      polygonRes: 80,
      rotation: 0.0055,
      obliquity: 1,
      landRatio: 0.88,
      mountainHeight: 31,
      plateTectonics: 0.002,
      scaleHeight: 1.01,
      atmosphereOpacity: 0.03,
      cloudFraction: 0.25,
      cloudCirculation: 0.0006,
      polarCaps: 0,
      magneticIntensity: 0.22,
      biosphere: 0.04,
      atmosphericEscape: 0.3,
      volcanism: 0.15,
    },
    palette: {
      oceanDeep: [25, 55, 90],
      ocean: [45, 95, 145],
      oceanShallow: [90, 145, 190],
      beach: [195, 220, 235],
      grass: [196, 136, 88],
      mountain: [236, 246, 252],
      atmosphere: [182, 222, 255],
      clouds: [245, 252, 255],
      magneticField: [210, 235, 255],
      polarCap: [255, 255, 255],
      lavaCore: [125, 190, 255],
      lavaEdge: [70, 130, 215],
      biosphereColors: [
        [150, 220, 255],
        [220, 175, 120],
        [120, 180, 235],
      ],
    },
  },
  titan: {
    sliders: {
      size: 183.055663665455,
      polygonRes: 80,
      rotation: 0.0015,
      obliquity: 27,
      landRatio: 0.58,
      mountainHeight: 35,
      plateTectonics: 0.001,
      scaleHeight: 1.3,
      atmosphereOpacity: 0.78,
      cloudFraction: 0.65,
      cloudCirculation: 0.0051,
      polarCaps: 0.2,
      magneticIntensity: 0.05,
      biosphere: 0.03,
      atmosphericEscape: 0.1,
      volcanism: 0.08,
    },
    palette: {
      oceanDeep: [18, 52, 96],
      ocean: [38, 95, 148],
      oceanShallow: [86, 156, 206],
      beach: [232, 168, 88],
      grass: [236, 242, 248],
      mountain: [116, 152, 182],
      atmosphere: [235, 165, 85],
      clouds: [255, 205, 120],
      magneticField: [220, 170, 100],
      polarCap: [220, 200, 170],
      lavaCore: [255, 165, 55],
      lavaEdge: [180, 82, 36],
      biosphereColors: [
        [250, 190, 110],
        [210, 145, 90],
        [140, 100, 80],
      ],
    },
  },
  io: {
    sliders: {
      size: () => radiusToSizeSlider(0.286),
      polygonRes: 80,
      rotation: 0.011,
      obliquity: 2,
      landRatio: 1,
      mountainHeight: () => mountainScale(0.028),
      plateTectonics: 0.004,
      scaleHeight: 1.01,
      atmosphereOpacity: 0.03,
      cloudFraction: 0.02,
      cloudCirculation: 0.001,
      polarCaps: 0,
      magneticIntensity: 0.05,
      biosphere: 0,
      atmosphericEscape: 0.42,
      volcanism: 1,
    },
    palette: {
      oceanDeep: [60, 35, 20],
      ocean: [116, 72, 28],
      oceanShallow: [176, 125, 38],
      beach: [225, 186, 70],
      grass: [210, 195, 55],
      mountain: [166, 110, 45],
      atmosphere: [221, 170, 86],
      clouds: [241, 210, 120],
      magneticField: [255, 210, 120],
      polarCap: [210, 180, 120],
      lavaCore: [255, 160, 30],
      lavaEdge: [220, 70, 20],
      biosphereColors: [
        [255, 150, 45],
        [245, 210, 95],
        [205, 120, 60],
      ],
    },
  },
  trappist_1e: {
    sliders: {
      size: () => radiusToSizeSlider(0.92),
      polygonRes: 80,
      rotation: 0.0035,
      obliquity: 1,
      landRatio: 0.48,
      mountainHeight: () => mountainScale(0.032),
      plateTectonics: 0.0012,
      scaleHeight: 1.08,
      atmosphereOpacity: 0.34,
      cloudFraction: 0.52,
      cloudCirculation: 0.0025,
      polarCaps: 0.16,
      magneticIntensity: 0.18,
      biosphere: 0.18,
      atmosphericEscape: 0.28,
      volcanism: 0.18,
    },
    palette: {
      oceanDeep: [15, 45, 90],
      ocean: [35, 95, 155],
      oceanShallow: [85, 150, 205],
      beach: [205, 180, 140],
      grass: [70, 120, 85],
      mountain: [120, 115, 105],
      atmosphere: [145, 170, 205],
      clouds: [225, 235, 245],
      magneticField: [180, 210, 250],
      polarCap: [240, 246, 255],
      lavaCore: [255, 145, 45],
      lavaEdge: [196, 72, 30],
      biosphereColors: [
        [120, 210, 170],
        [130, 180, 255],
        [240, 215, 140],
      ],
    },
  },
  trappist_1b: {
    sliders: {
      size: 304.245795369468,
      polygonRes: 80,
      rotation: 0.013,
      obliquity: 1,
      landRatio: 0.97,
      mountainHeight: 13,
      plateTectonics: 0.0018,
      scaleHeight: 1.1,
      atmosphereOpacity: 0.14,
      cloudFraction: 0.25,
      cloudCirculation: 0.0015,
      polarCaps: 0,
      magneticIntensity: 0.05,
      biosphere: 0,
      atmosphericEscape: 0.72,
      volcanism: 0.62,
    },
    palette: {
      oceanDeep: [30, 12, 10],
      ocean: [70, 25, 18],
      oceanShallow: [125, 48, 30],
      beach: [176, 88, 52],
      grass: [165, 72, 48],
      mountain: [128, 66, 52],
      atmosphere: [220, 90, 70],
      clouds: [240, 140, 110],
      magneticField: [235, 140, 120],
      polarCap: [200, 130, 110],
      lavaCore: [255, 120, 18],
      lavaEdge: [226, 48, 20],
      biosphereColors: [
        [230, 90, 70],
        [255, 150, 90],
        [180, 80, 70],
      ],
    },
  },
  l_98_59_b: {
    sliders: {
      size: 263.484587784561,
      polygonRes: 80,
      rotation: 0.0085,
      obliquity: 1,
      landRatio: 0.94,
      mountainHeight: 48,
      plateTectonics: 0.0015,
      scaleHeight: 1.17,
      atmosphereOpacity: 0.16,
      cloudFraction: 0.25,
      cloudCirculation: 0.0018,
      polarCaps: 0.02,
      magneticIntensity: 0.06,
      biosphere: 0,
      atmosphericEscape: 0.78,
      volcanism: 1,
    },
    palette: {
      oceanDeep: [20, 18, 22],
      ocean: [45, 35, 38],
      oceanShallow: [85, 65, 58],
      beach: [145, 108, 82],
      grass: [155, 95, 70],
      mountain: [118, 82, 70],
      atmosphere: [205, 120, 95],
      clouds: [225, 160, 130],
      magneticField: [225, 150, 120],
      polarCap: [190, 170, 160],
      lavaCore: [255, 118, 25],
      lavaEdge: [210, 58, 24],
      biosphereColors: [
        [200, 122, 92],
        [240, 176, 110],
        [145, 95, 85],
      ],
    },
  },
  cancri_55_e: {
    sliders: {
      size: () => radiusToSizeSlider(1.875),
      polygonRes: 80,
      rotation: 0.027,
      obliquity: 1,
      landRatio: 1,
      mountainHeight: () => mountainScale(0.026),
      plateTectonics: 0.002,
      scaleHeight: 1.1,
      atmosphereOpacity: 0.18,
      cloudFraction: 0.14,
      cloudCirculation: 0.0022,
      polarCaps: 0,
      magneticIntensity: 0.08,
      biosphere: 0,
      atmosphericEscape: 0.88,
      volcanism: 1,
    },
    palette: {
      oceanDeep: [15, 8, 12],
      ocean: [38, 12, 20],
      oceanShallow: [78, 20, 28],
      beach: [130, 42, 35],
      grass: [145, 45, 30],
      mountain: [95, 40, 35],
      atmosphere: [235, 110, 85],
      clouds: [245, 140, 110],
      magneticField: [245, 150, 120],
      polarCap: [170, 110, 100],
      lavaCore: [255, 120, 20],
      lavaEdge: [230, 45, 20],
      biosphereColors: [
        [255, 110, 70],
        [255, 170, 90],
        [180, 60, 55],
      ],
    },
  },
};

function applySpectrumPalette() {
  colors.oceanDeep = [random(0, 255), random(0, 255), random(0, 255)];
  colors.ocean = [random(0, 255), random(0, 255), random(0, 255)];
  colors.oceanShallow = [random(0, 255), random(0, 255), random(0, 255)];
  colors.beach = [random(0, 255), random(0, 255), random(0, 255)];
  colors.grass = [random(0, 255), random(0, 255), random(0, 255)];
  colors.mountain = [random(0, 255), random(0, 255), random(0, 255)];
  colors.atmosphere = [random(0, 255), random(0, 255), random(0, 255)];
  colors.clouds = [random(0, 255), random(0, 255), random(0, 255)];
  colors.magneticField = [random(0, 255), random(0, 255), random(0, 255)];
  colors.polarCap = [random(200, 255), random(200, 255), random(200, 255)];
  colors.lavaCore = [random(0, 255), random(0, 255), random(0, 255)];
  colors.lavaEdge = [random(0, 255), random(0, 255), random(0, 255)];
  colors.biosphereColors = [
    [random(0, 255), random(0, 255), random(0, 255)],
    [random(0, 255), random(0, 255), random(0, 255)],
    [random(0, 255), random(0, 255), random(0, 255)],
  ];
  colors.palette = "random";
  ui.activePresetKey = "random";
  updatePresetButtons();
}

function getSliderBounds(key) {
  const [min, max, _defaultVal, step] = SLIDER_CONFIGS[key];
  return {
    min: typeof min === "function" ? min() : min,
    max: typeof max === "function" ? max() : max,
    step,
  };
}

function clampAndSnapToStep(value, min, max, step) {
  const clamped = Math.max(min, Math.min(max, value));
  if (!step || step <= 0) return clamped;

  const snapped = min + Math.round((clamped - min) / step) * step;
  const precision = Math.max(0, (step.toString().split(".")[1] || "").length);
  return Number(Math.max(min, Math.min(max, snapped)).toFixed(precision));
}

function setSliderValue(key, value) {
  const slider = ui.sliders[key];
  if (!slider) return;

  const { min, max, step } = getSliderBounds(key);
  slider.value(clampAndSnapToStep(value, min, max, step));
}

function applySliderPreset(sliderPreset) {
  Object.keys(sliderPreset).forEach((key) => {
    const presetValue = sliderPreset[key];
    const value =
      typeof presetValue === "function" ? presetValue() : presetValue;
    setSliderValue(key, value);
  });
}

function randomizeSliders() {
  Object.keys(ui.sliders).forEach((key) => {
    if (!ui.sliders[key]) return;
    const { min, max } = getSliderBounds(key);
    setSliderValue(key, random(min, max));
  });
}

function applyRandomPreset() {
  randomizeSliders();
  applySpectrumPalette();
}

function applyEarthPreset() {
  applyPreset("earth");
}

function applyPaletteFromPreset(palette, presetKey) {
  colors.oceanDeep = [...palette.oceanDeep];
  colors.ocean = [...palette.ocean];
  colors.oceanShallow = [...palette.oceanShallow];
  colors.beach = [...palette.beach];
  colors.grass = [...palette.grass];
  colors.mountain = [...palette.mountain];
  colors.atmosphere = [...palette.atmosphere];
  colors.clouds = [...palette.clouds];
  colors.magneticField = [...palette.magneticField];
  colors.polarCap = [...palette.polarCap];
  colors.lavaCore = [...palette.lavaCore];
  colors.lavaEdge = [...palette.lavaEdge];
  colors.biosphereColors = palette.biosphereColors.map((color) => [...color]);

  colors.palette = presetKey;
  ui.activePresetKey = presetKey;
  updatePresetButtons();
}

function applyPreset(key) {
  if (key === "random") {
    applyRandomPreset();
    return;
  }

  const preset = PLANET_PRESETS[key];
  if (!preset) return;

  applySliderPreset(preset.sliders);
  applyPaletteFromPreset(preset.palette, key);
}

function snapshotCurrentSliders() {
  const sliderValues = {};
  Object.entries(ui.sliders).forEach(([key, slider]) => {
    if (!slider) return;
    sliderValues[key] = Number(slider.value());
  });
  return sliderValues;
}

function snapshotCurrentPalette() {
  return {
    oceanDeep: [...colors.oceanDeep],
    ocean: [...colors.ocean],
    oceanShallow: [...colors.oceanShallow],
    beach: [...colors.beach],
    grass: [...colors.grass],
    mountain: [...colors.mountain],
    atmosphere: [...colors.atmosphere],
    clouds: [...colors.clouds],
    magneticField: [...colors.magneticField],
    polarCap: [...colors.polarCap],
    lavaCore: [...colors.lavaCore],
    lavaEdge: [...colors.lavaEdge],
    biosphereColors: colors.biosphereColors.map((color) => [...color]),
  };
}

function buildPresetExportBlock(key) {
  const presetValue = {
    sliders: snapshotCurrentSliders(),
    palette: snapshotCurrentPalette(),
  };
  return `${key}: ${JSON.stringify(presetValue, null, 2)},`;
}

function setPresetExportStatus(message) {
  if (!ui.exportPresetStatus) return;
  ui.exportPresetStatus.html(message);
}

function showManualPresetCopyDialog(text, key) {
  const existing = document.getElementById("preset-export-dialog");
  if (existing) {
    existing.remove();
  }

  const dialog = document.createElement("div");
  dialog.id = "preset-export-dialog";
  dialog.style.position = "fixed";
  dialog.style.left = "16px";
  dialog.style.right = "16px";
  dialog.style.bottom = "16px";
  dialog.style.maxHeight = "45vh";
  dialog.style.zIndex = "9999";
  dialog.style.background = "#111";
  dialog.style.border = "1px solid #fff";
  dialog.style.padding = "10px";
  dialog.style.fontFamily = "monospace";
  dialog.style.color = "#fff";

  const title = document.createElement("div");
  title.textContent = `Manual copy: ${key} preset`;
  title.style.fontWeight = "bold";
  title.style.marginBottom = "6px";

  const help = document.createElement("div");
  help.textContent =
    "Clipboard access is blocked here. Select text below and copy.";
  help.style.fontSize = "12px";
  help.style.marginBottom = "6px";

  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.width = "100%";
  ta.style.height = "220px";
  ta.style.background = "#000";
  ta.style.color = "#fff";
  ta.style.border = "1px solid #555";
  ta.style.fontFamily = "monospace";
  ta.style.fontSize = "12px";
  ta.style.padding = "8px";
  ta.style.boxSizing = "border-box";

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.gap = "8px";
  controls.style.marginTop = "8px";

  const selectButton = document.createElement("button");
  selectButton.textContent = "Select All";
  selectButton.style.fontFamily = "monospace";
  selectButton.onclick = () => {
    ta.focus();
    ta.select();
  };

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.fontFamily = "monospace";
  closeButton.onclick = () => dialog.remove();

  controls.appendChild(selectButton);
  controls.appendChild(closeButton);

  dialog.appendChild(title);
  dialog.appendChild(help);
  dialog.appendChild(ta);
  dialog.appendChild(controls);
  document.body.appendChild(dialog);

  ta.focus();
  ta.select();
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "absolute";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  const copied = !!(document.execCommand && document.execCommand("copy"));
  document.body.removeChild(ta);
  return copied;
}

async function exportActivePresetBlock() {
  const key = ui.activePresetKey;
  if (!key || key === "random") {
    setPresetExportStatus("Select a named preset before exporting.");
    return;
  }

  const block = buildPresetExportBlock(key);
  window.__lastPresetExport = block;
  console.log(block);

  try {
    const copied = await copyTextToClipboard(block);
    if (copied) {
      setPresetExportStatus(`Copied "${key}" preset block.`);
    } else {
      showManualPresetCopyDialog(block, key);
      setPresetExportStatus("Copy blocked. Opened manual copy panel.");
    }
  } catch (error) {
    showManualPresetCopyDialog(block, key);
    setPresetExportStatus("Copy blocked. Opened manual copy panel.");
  }
}

function updatePresetButtons() {
  Object.entries(ui.presetButtons).forEach(([key, button]) => {
    const isActive = key === ui.activePresetKey;
    button.style("font-weight", isActive ? "bold" : "normal");
    button.style("background", isActive ? "black" : "white");
    button.style("color", isActive ? "white" : "black");
    button.style("border", "1px solid white");
  });
}

// ============================================================================
// MESH GENERATION & RENDERING
// ============================================================================

function generatePlanetMesh(radius, segmentsX, segmentsY, timeOffset = 0) {
  const count = segmentsX * segmentsY;

  // Allocate vertex pool once per resolution; reuse every subsequent frame.
  if (!_planetVertexPool || _planetVertexPool.length !== count) {
    _planetVertexPool = new Array(count);
    for (let k = 0; k < count; k++) {
      _planetVertexPool[k] = {
        x: 0,
        y: 0,
        z: 0,
        height: 0,
        r: 0,
        cr: 0,
        cg: 0,
        cb: 0,
        nv: 0,
      };
    }
  }

  const invSegX = 1 / segmentsX;
  const invSegY = 1 / segmentsY;
  const radiusScale = radius / 150;
  const noiseOX = params.noiseOffsetX;
  const noiseOY = params.noiseOffsetY;
  const landThreshold = params.landThreshold; // already computed in updateParameters

  for (let i = 0; i < segmentsX; i++) {
    const angle = i * invSegX * TWO_PI;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    for (let j = 0; j < segmentsY; j++) {
      const phi = j * invSegY * PI;
      const sinP = Math.sin(phi);
      const cosP = Math.cos(phi);

      // Unit-sphere normal — used for both noise sampling and scaled vertex position
      const nx = sinP * cosA;
      const ny = cosP;
      const nz = sinP * sinA;

      const heightVal = noise(
        (nx + noiseOX + timeOffset) * NOISE_SCALE,
        (ny + noiseOY + timeOffset * NOISE_DRIFT_SCALE_Y) * NOISE_SCALE,
        (nz + timeOffset * NOISE_DRIFT_SCALE_Z) * NOISE_SCALE,
      );

      // Normalize within the land zone so mountain height is independent of
      // land fraction: elevationFactor is always in [0, 1] for land pixels.
      const landRange = 1 - landThreshold;
      const elevationFactor =
        landRange > 0.0001
          ? Math.max(0, (heightVal - landThreshold) / landRange)
          : 0;
      const r = radius + elevationFactor * params.mountainHeight * radiusScale;

      // Update in-place — no allocation, no GC pressure
      const v = _planetVertexPool[i * segmentsY + j];
      v.x = r * nx;
      v.y = r * ny;
      v.z = r * nz;
      v.height = heightVal;
      v.r = r;
      // Bake noise variation into vertex so colorPlanetVertices avoids a
      // redundant noise() call per vertex per frame.
      v.nv = noise(heightVal * 5, v.x * 0.01, v.y * 0.01) * 200 - 100;
    }
  }

  return { vertices: _planetVertexPool, segmentsX, segmentsY };
}

// Build the static cloud vertex grid. Only called when polygon resolution changes.
// Computes unit-sphere positions and bakes domain-warp offsets into pre-multiplied
// noise sample coordinates, so the per-frame update needs only 1 noise call/vertex.
function generateCloudGrid(segX, segY) {
  const CLOUD_SCALE = 4;
  const WARP_AMOUNT = 0.3;
  const count = segX * segY;
  const grid = new Array(count);

  for (let i = 0; i < segX; i++) {
    const angle = (i / segX) * TWO_PI;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    for (let j = 0; j < segY; j++) {
      const phi = (j / segY) * PI;
      const sinP = Math.sin(phi);
      const cosP = Math.cos(phi);

      const x = sinP * cosA;
      const y = cosP;
      const z = sinP * sinA;

      // Domain-warp offsets depend only on position — precompute once, never again.
      // noise((x+warpX+cloudTime)*4, (y+warpY)*4, (z+cloudTime*0.5)*4)
      //   = noise(wx + cloudTime*4, wy, wz + cloudTime*2)
      const warpX = noise(x * 2 + 100, y * 2, z * 2) * WARP_AMOUNT;
      const warpY = noise(x * 2, y * 2 + 100, z * 2) * WARP_AMOUNT;

      grid[i * segY + j] = {
        ux: x,
        uy: y,
        uz: z, // unit-sphere position (scaled by cloudRadius at draw time)
        wx: (x + warpX) * CLOUD_SCALE, // baked noise sample coords (constant per vertex)
        wy: (y + warpY) * CLOUD_SCALE,
        wz: z * CLOUD_SCALE,
      };
    }
  }

  return { grid, values: new Float32Array(count), segX, segY };
}

// Refresh cloud noise values — exactly 1 noise() call per unique vertex.
function updateCloudValues(mesh) {
  const { grid, values } = mesh;
  const ctScale = params.cloudTime * 4; // cloudTime * CLOUD_SCALE
  const ctHalf = params.cloudTime * 2; // cloudTime * CLOUD_SCALE * 0.5
  for (let k = 0; k < values.length; k++) {
    const g = grid[k];
    values[k] = noise(g.wx + ctScale, g.wy, g.wz + ctHalf);
  }
}

function drawPlanetMesh(mesh) {
  if (!mesh) return;
  const { vertices, segmentsX, segmentsY } = mesh;

  noStroke();
  beginShape(TRIANGLES);

  for (let i = 0; i < segmentsX; i++) {
    for (let j = 0; j < segmentsY; j++) {
      const i2 = (i + 1) % segmentsX;
      const j2 = Math.min(j + 1, segmentsY - 1);

      const v1 = vertices[i * segmentsY + j];
      const v2 = vertices[i2 * segmentsY + j];
      const v3 = vertices[i2 * segmentsY + j2];
      const v4 = vertices[i * segmentsY + j2];

      // Colors were pre-computed once per unique vertex by colorPlanetVertices().
      // Triangle 1: v1, v2, v3
      fill(v1.cr, v1.cg, v1.cb);
      vertex(v1.x, v1.y, v1.z);
      fill(v2.cr, v2.cg, v2.cb);
      vertex(v2.x, v2.y, v2.z);
      fill(v3.cr, v3.cg, v3.cb);
      vertex(v3.x, v3.y, v3.z);

      // Triangle 2: v1, v3, v4
      fill(v1.cr, v1.cg, v1.cb);
      vertex(v1.x, v1.y, v1.z);
      fill(v3.cr, v3.cg, v3.cb);
      vertex(v3.x, v3.y, v3.z);
      fill(v4.cr, v4.cg, v4.cb);
      vertex(v4.x, v4.y, v4.z);
    }
  }

  endShape();
}

// ============================================================================
// COLOR UTILITIES & TERRAIN COLORING
// ============================================================================

// Reusable scratch arrays — avoids allocating a new [r,g,b] on every lerp call.
// _colorOut is the final output written by getVertexColor.
// _colorScratch is used for intermediate blends within getVertexColor.
const _colorOut = [0, 0, 0];
const _colorScratch = [0, 0, 0];

// Run once per frame over the flat vertex array. Each unique vertex is colored
// exactly once and the result stored as cr/cg/cb, eliminating the 2-4× redundant
// recoloring that occurred when adjacent quads shared vertices in the draw loop.
function colorPlanetVertices(mesh) {
  if (!mesh) return;
  const verts = mesh.vertices;
  for (let k = 0; k < verts.length; k++) {
    const v = verts[k];
    getVertexColor(v.height, v);
    v.cr = _colorOut[0];
    v.cg = _colorOut[1];
    v.cb = _colorOut[2];
  }
}

// Lerp a into b by t, writing the result into `out`. Returns `out`.
function lerpColorInto(out, a, b, t) {
  const tt = t < 0 ? 0 : t > 1 ? 1 : t;
  out[0] = a[0] + (b[0] - a[0]) * tt;
  out[1] = a[1] + (b[1] - a[1]) * tt;
  out[2] = a[2] + (b[2] - a[2]) * tt;
  return out;
}

// Write the terrain color for `height` directly into `out`. Returns `out`.
function getTerrainColorInto(out, height) {
  // Use per-frame caches computed once in updateParameters
  const landThreshold = params.landThreshold;

  // Ocean gradient
  if (height < landThreshold) {
    const t =
      height < 0 ? 0 : height / landThreshold > 1 ? 1 : height / landThreshold;

    if (t < OCEAN_DEEP_THRESHOLD) {
      return lerpColorInto(
        out,
        colors.oceanDeep,
        colors.ocean,
        t / OCEAN_DEEP_THRESHOLD,
      );
    }

    if (t < OCEAN_MID_THRESHOLD) {
      return lerpColorInto(
        out,
        colors.ocean,
        colors.oceanShallow,
        (t - OCEAN_DEEP_THRESHOLD) /
          (OCEAN_MID_THRESHOLD - OCEAN_DEEP_THRESHOLD),
      );
    }

    return lerpColorInto(
      out,
      colors.oceanShallow,
      colors.beach,
      (t - OCEAN_MID_THRESHOLD) / (1 - OCEAN_MID_THRESHOLD),
    );
  }

  // Land gradient — normalised within the land zone so topography and land
  // fraction are fully independent: mountainStart is controlled only by the
  // topography slider, not by how much of the planet is ocean.
  const topographyRatio = params.topographyRatio;
  const landRange = 1 - landThreshold;
  const landHeightNorm =
    landRange < 0.0001 ? 0 : (height - landThreshold) / landRange;

  // topographyRatio=0 → mountainStart=1 (no mountain colour ever shows)
  // topographyRatio=1 → mountainStart=0.25 (mountains cover 75 % of land)
  const mountainStart = 1 - topographyRatio * 0.75;

  if (landHeightNorm < mountainStart) {
    const tGrass = mountainStart < 0.0001 ? 0 : landHeightNorm / mountainStart;
    return lerpColorInto(
      out,
      colors.beach,
      colors.grass,
      tGrass < 0 ? 0 : tGrass > 1 ? 1 : tGrass,
    );
  }

  const span = 1 - mountainStart;
  const tMount = span < 0.0001 ? 0 : (landHeightNorm - mountainStart) / span;
  return lerpColorInto(
    out,
    colors.grass,
    colors.mountain,
    tMount < 0 ? 0 : tMount > 1 ? 1 : tMount,
  );
}

function getVertexColor(height, vertex) {
  // Write terrain color into the output scratch array
  getTerrainColorInto(_colorOut, height);
  let r = _colorOut[0],
    g = _colorOut[1],
    b = _colorOut[2];

  // Use pre-baked noise variation from mesh generation
  const variation = vertex.nv;
  r += variation;
  g += variation * 0.5;
  b += variation * 0.3;

  // Polar caps based on latitude — use stored radius to avoid sqrt()
  const radius = vertex.r;
  const latNorm = radius > 0 ? Math.abs(vertex.y) / radius : 0;
  const capAmount = params.polarCaps;
  // Early rejection: skip noise for vertices clearly outside polar cap zone
  if (capAmount > 0 && latNorm > 1 - capAmount - 0.12) {
    const edgeNoise = noise(vertex.x * 0.02, vertex.y * 0.02, vertex.z * 0.02);
    const edgeJitter = (edgeNoise - 0.5) * 0.24;
    const capStart = 1 - capAmount + edgeJitter;
    const capEnd =
      capStart + POLAR_CAP_SOFTNESS < 1 ? capStart + POLAR_CAP_SOFTNESS : 1;
    const raw =
      (latNorm - capStart) /
      (capEnd - capStart < 0.0001 ? 0.0001 : capEnd - capStart);
    const t = capAmount >= 1 ? 1 : raw < 0 ? 0 : raw > 1 ? 1 : raw;
    if (t > 0) {
      // Blend current color toward polar cap in-place, no new array
      _colorScratch[0] = r;
      _colorScratch[1] = g;
      _colorScratch[2] = b;
      lerpColorInto(_colorScratch, _colorScratch, colors.polarCap, t);
      r = _colorScratch[0];
      g = _colorScratch[1];
      b = _colorScratch[2];
    }
  }

  // Volcanic hotspot coloring — uses precomputed cache, no trig per vertex
  if (volcanismCache.activeCount > 0) {
    // Normalize vertex to unit vector using stored radius
    const vx = vertex.x / radius;
    const vy = vertex.y / radius;
    const vz = vertex.z / radius;

    // Quick rejection: skip expensive edge noise if vertex is far from all hotspots
    let nearAny = false;
    for (let i = 0; i < volcanismCache.activeCount; i++) {
      const uv = volcanismCache.unitVecs[i];
      if (
        uv.hx * vx + uv.hy * vy + uv.hz * vz >
        volcanismCache.looseCosThreshold
      ) {
        nearAny = true;
        break;
      }
    }

    if (nearAny) {
      const edgeNoise = noise(
        vx * 4.0 + 300,
        vy * 4.0 + 300,
        vz * 4.0 + params.volcanismTime * 0.15,
      );
      const noisyThreshold =
        volcanismCache.cosInfluence + (edgeNoise - 0.5) * 0.9;

      for (let i = 0; i < volcanismCache.activeCount; i++) {
        const { hx, hy, hz } = volcanismCache.unitVecs[i];
        const dot = hx * vx + hy * vy + hz * vz;
        if (dot <= noisyThreshold) continue;

        const proximity = (dot - noisyThreshold) / (1 - noisyThreshold);
        const blend = Math.min(
          1,
          Math.pow(proximity, 3.0) *
            params.volcanism *
            volcanismCache.pulses[i] *
            2.5,
        );

        // Lava color → blend into current color, all in scratch arrays
        lerpColorInto(
          _colorScratch,
          colors.lavaEdge,
          colors.lavaCore,
          proximity,
        );
        _colorOut[0] = r;
        _colorOut[1] = g;
        _colorOut[2] = b;
        lerpColorInto(_colorOut, _colorOut, _colorScratch, blend);
        r = _colorOut[0];
        g = _colorOut[1];
        b = _colorOut[2];
      }
    }
  }

  // Clamp to valid range
  _colorOut[0] = r < 0 ? 0 : r > 255 ? 255 : r;
  _colorOut[1] = g < 0 ? 0 : g > 255 ? 255 : g;
  _colorOut[2] = b < 0 ? 0 : b > 255 ? 255 : b;
  return _colorOut;
}

// drawTriangle removed — drawPlanetMesh now batches all triangles into a
// single beginShape(TRIANGLES) / endShape() call, eliminating thousands of
// individual GPU submissions per frame.

// ============================================================================
// MAGNETIC FIELD VISUALIZATION
// ============================================================================

function drawMagneticField(radius) {
  const lineCount = Math.floor(params.magneticIntensity * 30);
  if (lineCount === 0) return;

  const L = radius * 3.0;
  const particleSpeed = 0.003;
  const particleSize = radius * 0.0125;
  const tailLength = 25;
  const tailSpacing = 0.03;
  const minRadius = radius * 0.1;
  const invTailLength = 1 / tailLength;
  // lerp(0.12, PI-0.12, t) = 0.12 + (PI-0.24)*t
  const THETA_MIN = 0.12;
  const THETA_RANGE = Math.PI - 0.24;

  // Irregular longitude and phase offsets for up to 30 particles
  const lonOffsets = [
    0, 0.7, 1.9, 2.4, 3.1, 3.8, 4.5, 5.0, 5.7, 6.1, 0.3, 1.2, 2.0, 2.8, 3.5,
    4.1, 4.8, 5.4, 5.9, 0.5, 1.5, 2.2, 2.9, 3.4, 4.0, 4.6, 5.2, 5.8, 0.9, 1.7,
  ];
  const phaseOffsets = [
    0.13, 0.87, 0.42, 0.91, 0.28, 0.65, 0.03, 0.74, 0.51, 0.96, 0.19, 0.62,
    0.35, 0.81, 0.08, 0.57, 0.92, 0.26, 0.69, 0.14, 0.78, 0.44, 0.89, 0.31,
    0.66, 0.07, 0.53, 0.97, 0.22, 0.71,
  ];
  const speedOffsets = [
    0.85, 1.32, 0.67, 1.15, 0.92, 1.41, 0.58, 1.08, 0.76, 1.28, 0.94, 1.19,
    0.71, 1.37, 0.63, 1.12, 0.89, 1.45, 0.55, 1.03, 0.98, 1.24, 0.79, 1.35,
    0.61, 1.09, 0.87, 1.47, 0.73, 1.21,
  ];

  const mr = colors.magneticField[0];
  const mg = colors.magneticField[1];
  const mb = colors.magneticField[2];

  noStroke();
  beginShape(TRIANGLES);

  for (let l = 0; l < lineCount; l++) {
    const lon = lonOffsets[l];
    const cosLon = Math.cos(lon);
    const sinLon = Math.sin(lon);
    const phase =
      (frameCount * particleSpeed * speedOffsets[l] + phaseOffsets[l]) % 1;

    for (let t = 0; t < tailLength; t++) {
      const trailPhase = (phase - t * tailSpacing + 1) % 1;

      // Field line position
      const theta = THETA_MIN + THETA_RANGE * trailPhase;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      const rDipole = L * sinTheta * sinTheta; // sq(sin(theta))
      const r = Math.max(minRadius, rDipole);

      const cx = r * sinTheta * cosLon;
      const cy = r * cosTheta;
      const cz = r * sinTheta * sinLon;

      const tailFade = 1 - t * invTailLength;
      const edgeFade = Math.min(trailPhase / 0.08, (1 - trailPhase) / 0.08);
      const alpha = 200 * tailFade * Math.max(0, Math.min(1, edgeFade));
      const half = particleSize * (0.4 + 0.6 * tailFade) * 0.5;

      // Cross-shaped billboard (XY + YZ quads) — complementary coverage across all rotation angles
      fill(mr, mg, mb, alpha);
      // XY plane (normal = local Z, apparent area = |cos θ|)
      vertex(cx - half, cy - half, cz);
      vertex(cx + half, cy - half, cz);
      vertex(cx + half, cy + half, cz);
      vertex(cx - half, cy - half, cz);
      vertex(cx + half, cy + half, cz);
      vertex(cx - half, cy + half, cz);
      // YZ plane (normal = local X, apparent area = |sin θ|)
      vertex(cx, cy - half, cz - half);
      vertex(cx, cy + half, cz - half);
      vertex(cx, cy + half, cz + half);
      vertex(cx, cy - half, cz - half);
      vertex(cx, cy + half, cz + half);
      vertex(cx, cy - half, cz + half);
    }
  }

  endShape();
}

// ============================================================================
// CLOUD VISUALIZATION
// ============================================================================

function drawClouds(radius) {
  if (params.cloudFraction <= 0) return;

  const cloudRadius = (radius * (1 + params.scaleHeight)) / 2;
  const segX = Math.max(5, Math.round(params.polygonRes * 0.5625));
  const segY = Math.max(4, Math.round(params.polygonRes * 0.5));

  // Regenerate static grid only when resolution changes (not every frame).
  // This permanently eliminates the 2 domain-warp noise calls per vertex per frame.
  if (segX !== lastCloudSegX || segY !== lastCloudSegY) {
    cloudMesh = generateCloudGrid(segX, segY);
    lastCloudSegX = segX;
    lastCloudSegY = segY;
  }

  // Refresh noise values: 1 noise call/vertex (was 3).
  updateCloudValues(cloudMesh);

  const { grid, values } = cloudMesh;
  const threshold = 1 - params.cloudFraction;
  const cr = colors.clouds[0];
  const cg = colors.clouds[1];
  const cb = colors.clouds[2];

  push();
  blendMode(BLEND);
  noStroke();
  beginShape(TRIANGLES);

  for (let i = 0; i < segX; i++) {
    const i2 = (i + 1) % segX;
    for (let j = 0; j < segY; j++) {
      const j2 = Math.min(j + 1, segY - 1);

      const k0 = i * segY + j;
      const k1 = i * segY + j2;
      const k2 = i2 * segY + j;
      const k3 = i2 * segY + j2;

      const avgCloud =
        (values[k0] + values[k1] + values[k2] + values[k3]) * 0.25;
      if (avgCloud <= threshold) continue;

      const cloudIntensity = (avgCloud - threshold) / params.cloudFraction;
      const alpha = Math.min(255, cloudIntensity * 200 + 100);

      const g0 = grid[k0],
        g1 = grid[k1],
        g2 = grid[k2],
        g3 = grid[k3];

      // All 6 vertices share the same fill — set once per quad.
      fill(cr, cg, cb, alpha);
      // Triangle 1: k0, k1, k2
      vertex(g0.ux * cloudRadius, g0.uy * cloudRadius, g0.uz * cloudRadius);
      vertex(g1.ux * cloudRadius, g1.uy * cloudRadius, g1.uz * cloudRadius);
      vertex(g2.ux * cloudRadius, g2.uy * cloudRadius, g2.uz * cloudRadius);
      // Triangle 2: k1, k3, k2
      vertex(g1.ux * cloudRadius, g1.uy * cloudRadius, g1.uz * cloudRadius);
      vertex(g3.ux * cloudRadius, g3.uy * cloudRadius, g3.uz * cloudRadius);
      vertex(g2.ux * cloudRadius, g2.uy * cloudRadius, g2.uz * cloudRadius);
    }
  }

  endShape();
  pop();
}

// ============================================================================
// BIOSPHERE PARTICLES
// ============================================================================

function drawBiosphereParticles(radius) {
  if (params.biosphere <= 0) return;

  const particleCount = Math.floor(params.biosphere * 200);
  const surfaceRadius = radius * 1.02;
  const tailSegments = 10;
  const invTail = 1 / tailSegments;
  const half = radius * 0.005 * 0.75; // box(radius*0.005) → half-extent, 50% larger

  push();
  blendMode(ADD);
  noStroke();
  beginShape(TRIANGLES);

  for (let p = 0; p < particleCount; p++) {
    const lon = (p * 2.39996322972865355) % TWO_PI;
    // Use (2p+1) to centre the Fibonacci distribution away from the exact poles
    const phi = Math.acos(1 - (2 * p + 1) / particleCount);

    const bc = colors.biosphereColors[p % 3];
    const pr = bc[0],
      pg = bc[1],
      pb = bc[2];
    const opacity = 204;

    const time = params.bioTime + p * 0.5;
    const seedA = p * 0.02;
    const seedB = seedA + 1000;

    // Tail segments
    for (let seg = 0; seg < tailSegments; seg++) {
      const pastT = (time - seg * invTail * 1.4) * 0.05;
      const pastChaoticLon = noise(seedA, pastT) * TWO_PI * 2 - PI;
      const pastChaoticPhi = (noise(seedB, pastT) - 0.5) * PI * 0.8;
      const pastOrbitLon = lon + pastChaoticLon;
      const pastOrbitPhi = Math.max(0, Math.min(PI, phi + pastChaoticPhi));

      const sinPOP = Math.sin(pastOrbitPhi);
      const cx = surfaceRadius * sinPOP * Math.cos(pastOrbitLon);
      const cy = surfaceRadius * Math.cos(pastOrbitPhi);
      const cz = surfaceRadius * sinPOP * Math.sin(pastOrbitLon);

      const fade = 1 - seg * invTail;
      fill(pr, pg, pb, opacity * fade);
      // Cross-shaped billboard (XY + YZ quads)
      vertex(cx - half, cy - half, cz);
      vertex(cx + half, cy - half, cz);
      vertex(cx + half, cy + half, cz);
      vertex(cx - half, cy - half, cz);
      vertex(cx + half, cy + half, cz);
      vertex(cx - half, cy + half, cz);
      vertex(cx, cy - half, cz - half);
      vertex(cx, cy + half, cz - half);
      vertex(cx, cy + half, cz + half);
      vertex(cx, cy - half, cz - half);
      vertex(cx, cy + half, cz + half);
      vertex(cx, cy - half, cz + half);
    }

    // Head
    const timeT = time * 0.05;
    const chaoticLon = noise(seedA, timeT) * TWO_PI * 2 - PI;
    const chaoticPhi = (noise(seedB, timeT) - 0.5) * PI * 0.8;
    const orbitLon = lon + chaoticLon;
    const orbitPhi = Math.max(0, Math.min(PI, phi + chaoticPhi));
    const sinOP = Math.sin(orbitPhi);
    const ppx = surfaceRadius * sinOP * Math.cos(orbitLon);
    const ppy = surfaceRadius * Math.cos(orbitPhi);
    const ppz = surfaceRadius * sinOP * Math.sin(orbitLon);

    fill(pr, pg, pb, opacity);
    // Cross-shaped billboard (XY + YZ quads)
    vertex(ppx - half, ppy - half, ppz);
    vertex(ppx + half, ppy - half, ppz);
    vertex(ppx + half, ppy + half, ppz);
    vertex(ppx - half, ppy - half, ppz);
    vertex(ppx + half, ppy + half, ppz);
    vertex(ppx - half, ppy + half, ppz);
    vertex(ppx, ppy - half, ppz - half);
    vertex(ppx, ppy + half, ppz - half);
    vertex(ppx, ppy + half, ppz + half);
    vertex(ppx, ppy - half, ppz - half);
    vertex(ppx, ppy + half, ppz + half);
    vertex(ppx, ppy - half, ppz + half);
  }

  endShape();
  pop();
}

// ============================================================================
// ATMOSPHERE VISUALIZATION
// ============================================================================

function drawAtmosphere(radius) {
  if (params.atmosphereOpacity <= 0) return;

  const atmosphereRadius = radius * params.scaleHeight;
  const alpha = params.atmosphereOpacity * 255;

  push();

  // Set blend mode for proper transparency
  blendMode(BLEND);

  noStroke();
  fill(colors.atmosphere[0], colors.atmosphere[1], colors.atmosphere[2], alpha);

  // Enable front-face culling to render only the inner shell
  drawingContext.enable(drawingContext.CULL_FACE);
  drawingContext.cullFace(drawingContext.FRONT);

  // Use p5's built-in sphere with moderate detail
  const atmDetail = Math.max(6, Math.round(params.polygonRes * 0.6));
  sphere(atmosphereRadius, atmDetail, atmDetail);

  // Disable culling for other objects
  drawingContext.disable(drawingContext.CULL_FACE);

  pop();
}

// ============================================================================
// ATMOSPHERIC ESCAPE VISUALIZATION
// ============================================================================

// One-time construction of the cell grid for the escape halo.
// Eliminates sqrt, atan2, cos, sin and the angSpeedVar noise call from the
// per-frame hot path by baking them into a flat typed-array cache.
function buildHaloCache(innerRadius, outerRadius, cellSize) {
  const cellHalf = cellSize / 2;
  const annulusSpan = outerRadius - innerRadius;
  const innerR2 = innerRadius * innerRadius;
  const outerR2 = outerRadius * outerRadius;

  // First pass: count surviving cells so we can allocate exact-size typed arrays.
  let count = 0;
  for (let px = -outerRadius; px < outerRadius; px += cellSize) {
    for (let py = -outerRadius; py < outerRadius; py += cellSize) {
      const cx = px + cellHalf;
      const cy = py + cellHalf;
      const d2 = cx * cx + cy * cy;
      if (d2 >= innerR2 && d2 <= outerR2) count++;
    }
  }

  // Struct-of-arrays layout for CPU cache friendliness.
  const cxArr = new Float32Array(count);
  const cyArr = new Float32Array(count);
  const ndArr = new Float32Array(count); // normalizedDist
  const asvArr = new Float32Array(count); // angSpeedVar
  const noiseXArr = new Float32Array(count); // pre-multiplied noise X coord
  const noiseYArr = new Float32Array(count); // pre-multiplied noise Y coord

  let k = 0;
  for (let px = -outerRadius; px < outerRadius; px += cellSize) {
    for (let py = -outerRadius; py < outerRadius; py += cellSize) {
      const cx = px + cellHalf;
      const cy = py + cellHalf;
      const d2 = cx * cx + cy * cy;
      if (d2 < innerR2 || d2 > outerR2) continue;

      const dist = Math.sqrt(d2);
      // Use unit vector components directly — avoids atan2 + cos + sin
      const angSpeedVar =
        0.5 + 0.5 * noise((cx / dist) * 2 + 50, (cy / dist) * 2 + 50);

      cxArr[k] = cx;
      cyArr[k] = cy;
      ndArr[k] = (dist - innerRadius) / annulusSpan;
      asvArr[k] = angSpeedVar;
      noiseXArr[k] = cx * 0.012 + 250; // pre-multiplied for the single per-frame noise call
      noiseYArr[k] = cy * 0.012 + 250;
      k++;
    }
  }

  return { cxArr, cyArr, ndArr, asvArr, noiseXArr, noiseYArr, count };
}

function drawAtmosphericEscapeHalo(radius) {
  if (params.atmosphericEscape <= 0) return;

  const escapeSlider = params.atmosphericEscape;
  // Perceptual remap: increases response in the bottom quarter without
  // changing the top end (escapeSlider=1 still maps to 1).
  const escapeStrength =
    0.35 * escapeSlider + 0.65 * Math.pow(escapeSlider, 0.55);

  const atmosphereRadius = radius * params.scaleHeight;
  const innerRadius = atmosphereRadius * 1.02;
  const outerRadius =
    atmosphereRadius + radius * 0.1 + radius * 0.8 * escapeStrength;
  const cellSize = Math.max(3, radius * 0.03);

  // Rebuild the static cell cache only when geometry changes.
  if (
    innerRadius !== _haloCacheKey.innerRadius ||
    outerRadius !== _haloCacheKey.outerRadius ||
    cellSize !== _haloCacheKey.cellSize
  ) {
    _haloCache = buildHaloCache(innerRadius, outerRadius, cellSize);
    _haloCacheKey.innerRadius = innerRadius;
    _haloCacheKey.outerRadius = outerRadius;
    _haloCacheKey.cellSize = cellSize;
  }

  const { cxArr, cyArr, ndArr, asvArr, noiseXArr, noiseYArr, count } =
    _haloCache;

  const dotHalf = cellSize * 0.4 * 0.5;
  const escapeBase = 0.01 + escapeStrength * 0.04;
  const densityGain = 2 + (1 - escapeStrength) * 1.5;
  const coverageCutoff = 0.05 - (1 - escapeStrength) * 0.03;
  const lowEndAlphaBoost = 1 + (1 - escapeStrength) * 0.8;
  const atmoAlphaFull = params.atmosphereOpacity * 255;
  const fcTime = frameCount * 0.006; // single combined temporal offset
  const ar = colors.atmosphere[0];
  const ag = colors.atmosphere[1];
  const ab = colors.atmosphere[2];

  push();
  noStroke();
  beginShape(TRIANGLES);

  for (let k = 0; k < count; k++) {
    const nd = ndArr[k];
    const asv = asvArr[k];

    // Wave: position-phased outward pulse
    const wavePhase = nd - frameCount * (escapeBase * asv);
    const wave = ((wavePhase % 1) + 1) % 1;

    // Single noise call per cell (was 3: angSpeedVar + slowNoise + fastNoise)
    const noiseVal = noise(noiseXArr[k], noiseYArr[k], fcTime);

    const densityEnvelope = escapeStrength * densityGain * (1 - nd);
    const coverage =
      (densityEnvelope < 1 ? densityEnvelope : 1) *
      (1 - wave * 0.75) *
      (0.6 + noiseVal * 0.4);

    if (coverage <= coverageCutoff) continue;

    // Smooth alpha: radial fade (opaque at inner edge, transparent at outer) × coverage
    const alpha = Math.min(
      255,
      atmoAlphaFull * (1 - nd) * Math.min(1, coverage * 1.5) * lowEndAlphaBoost,
    );
    const cx = cxArr[k],
      cy = cyArr[k];

    fill(ar, ag, ab, alpha);
    vertex(cx - dotHalf, cy - dotHalf, 0);
    vertex(cx + dotHalf, cy - dotHalf, 0);
    vertex(cx + dotHalf, cy + dotHalf, 0);
    vertex(cx - dotHalf, cy - dotHalf, 0);
    vertex(cx + dotHalf, cy + dotHalf, 0);
    vertex(cx - dotHalf, cy + dotHalf, 0);
  }

  endShape();
  pop();
}

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const { Services } = ChromeUtils.importESModule("resource://gre/modules/Services.sys.mjs");

// Default palette list
const defaultPalette = [
  "#181818", "#d4af37", "#E91E63", "#9C27B0",
  "#2196F3", "#4CAF50", "#FF5722", "#607D8B"
];

// Theme State
let pontos = [];
let activePointId = null;
let angle = 90;
let borderRadius = 0;

// Find main window manager for live updates
let manager = window.top?.FapybaraThemeManager || window.opener?.FapybaraThemeManager;

// DOM Elements
const canvas = document.getElementById("gradientCanvas");
const addBtn = document.getElementById("addColorBtn");
const removeBtn = document.getElementById("removeColorBtn");
const paletteRow = document.getElementById("paletteRow");
const angleSlider = document.getElementById("angleSlider");
const angleVal = document.getElementById("angleVal");
const radiusSlider = document.getElementById("radiusSlider");
const radiusVal = document.getElementById("radiusVal");
const resetBtn = document.getElementById("resetBtn");

// Initialize Mixer
function init() {
  loadPrefs();
  setupEventListeners();
  render();
}

function loadPrefs() {
  if (manager) {
    angle = parseInt(manager.gradientAngle || "90", 10);
    borderRadius = parseInt((manager.borderRadius || "0px").replace("px", ""), 10);
    pontos = JSON.parse(JSON.stringify(manager.pontos || []));
  } else {
    try {
      angle = parseInt(Services.prefs.getStringPref("fapybara.theme.gradient-angle", "90"), 10);
      borderRadius = parseInt(Services.prefs.getStringPref("fapybara.theme.border-radius", "0px").replace("px", ""), 10);
      const pointsStr = Services.prefs.getStringPref("fapybara.theme.gradient-points", "[]");
      pontos = JSON.parse(pointsStr);
    } catch (e) {
      console.error("Error loading theme mixer preferences:", e);
    }
  }

  if (!Array.isArray(pontos) || pontos.length === 0) {
    pontos = [
      { id: 1, x: 0, color: "#181818" },
      { id: 2, x: 100, color: "#d4af37" }
    ];
  }
  
  if (pontos.length > 0) {
    activePointId = pontos[0].id;
  }
}

function savePrefs() {
  if (manager) {
    manager.updateSettings(pontos, angle, borderRadius);
  } else {
    try {
      Services.prefs.setStringPref("fapybara.theme.gradient-angle", String(angle));
      Services.prefs.setStringPref("fapybara.theme.border-radius", `${borderRadius}px`);
      Services.prefs.setStringPref("fapybara.theme.gradient-points", JSON.stringify(pontos));
      
      if (pontos.length > 0) {
        Services.prefs.setStringPref("fapybara.theme.sidebar-bg", pontos[0].color);
        if (pontos.length > 1) {
          Services.prefs.setStringPref("fapybara.theme.accent-color", pontos[pontos.length - 1].color);
        } else {
          Services.prefs.setStringPref("fapybara.theme.accent-color", pontos[0].color);
        }
      }
    } catch (e) {
      console.error("Error saving theme mixer preferences:", e);
    }
  }
}

function render() {
  // Update Sliders UI
  angleSlider.value = angle;
  angleVal.textContent = `${angle}°`;
  radiusSlider.value = borderRadius;
  radiusVal.textContent = `${borderRadius}px`;
  
  // Render color dots inside canvas
  canvas.querySelectorAll(".color-dot").forEach(el => el.remove());
  
  pontos.forEach(p => {
    const dot = document.createElement("div");
    dot.className = `color-dot ${p.id === activePointId ? "active" : ""}`;
    dot.style.left = `${p.x}%`;
    dot.style.backgroundColor = p.color;
    dot.dataset.id = p.id;
    
    dot.addEventListener("mousedown", (e) => startDrag(e, p.id));
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      setActivePoint(p.id);
    });
    
    canvas.appendChild(dot);
  });
  
  // Update button states (cap at 3 colors)
  addBtn.disabled = pontos.length >= 3;
  removeBtn.disabled = pontos.length <= 1;
  
  updateCanvasGradient();
  updateActivePaletteColor();
}

function updateCanvasGradient() {
  pontos.sort((a, b) => a.x - b.x);
  
  let gradientString = "linear-gradient(90deg, ";
  pontos.forEach((p, idx) => {
    gradientString += `${p.color} ${p.x}%`;
    if (idx < pontos.length - 1) gradientString += ", ";
  });
  gradientString += ")";
  
  canvas.style.background = gradientString;
}

function setActivePoint(id) {
  activePointId = id;
  render();
}

function updateActivePaletteColor() {
  const activePoint = pontos.find(p => p.id === activePointId);
  if (!activePoint) return;
  
  paletteRow.querySelectorAll(".palette-color").forEach(el => {
    const color = el.dataset.color.toLowerCase();
    const activeColor = activePoint.color.toLowerCase();
    if (color === activeColor) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

function setupEventListeners() {
  // Add Point
  addBtn.addEventListener("click", () => {
    if (pontos.length >= 3) return;
    
    const existingXs = pontos.map(p => p.x);
    let newX = 50;
    while (existingXs.includes(newX) && newX < 100) {
      newX += 10;
    }
    
    const newId = Date.now();
    pontos.push({
      id: newId,
      x: newX,
      color: "#607D8B"
    });
    
    activePointId = newId;
    savePrefs();
    render();
  });
  
  // Remove Active Point
  removeBtn.addEventListener("click", () => {
    if (pontos.length <= 1) return;
    
    pontos = pontos.filter(p => p.id !== activePointId);
    activePointId = pontos[0].id;
    
    savePrefs();
    render();
  });
  
  // Click on Canvas to add point (if under 3 points)
  canvas.addEventListener("click", (e) => {
    if (e.target !== canvas) return;
    if (pontos.length >= 3) return;
    
    const rect = canvas.getBoundingClientRect();
    const percentX = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    
    const newId = Date.now();
    pontos.push({
      id: newId,
      x: Math.max(0, Math.min(100, percentX)),
      color: "#d4af37"
    });
    
    activePointId = newId;
    savePrefs();
    render();
  });
  
  // Color Palette Clicks
  paletteRow.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.classList.contains("palette-color")) return;
    
    const activePoint = pontos.find(p => p.id === activePointId);
    if (activePoint) {
      activePoint.color = target.dataset.color;
      savePrefs();
      render();
    }
  });
  
  // Angle Slider
  angleSlider.addEventListener("input", (e) => {
    angle = parseInt(e.target.value, 10);
    angleVal.textContent = `${angle}°`;
    savePrefs();
  });
  
  // Radius Slider
  radiusSlider.addEventListener("input", (e) => {
    borderRadius = parseInt(e.target.value, 10);
    radiusVal.textContent = `${borderRadius}px`;
    savePrefs();
  });
  
  // Reset Button
  resetBtn.addEventListener("click", () => {
    pontos = [
      { id: 1, x: 0, color: "#181818" },
      { id: 2, x: 100, color: "#d4af37" }
    ];
    activePointId = 1;
    angle = 90;
    borderRadius = 0;
    
    savePrefs();
    render();
  });
}

// Drag & Drop Implementation
let dragId = null;

function startDrag(e, id) {
  e.preventDefault();
  dragId = id;
  setActivePoint(id);
  
  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDrag);
}

function handleDrag(e) {
  if (dragId === null) return;
  
  const rect = canvas.getBoundingClientRect();
  const rawX = e.clientX - rect.left;
  const percentX = Math.round((rawX / rect.width) * 100);
  
  const point = pontos.find(p => p.id === dragId);
  if (point) {
    point.x = Math.max(0, Math.min(100, percentX));
    updateCanvasGradient();
    
    const dot = canvas.querySelector(`.color-dot[data-id="${dragId}"]`);
    if (dot) {
      dot.style.left = `${point.x}%`;
    }
    
    // Live update settings as we drag!
    if (manager) {
      manager.updateSettings(pontos, angle, borderRadius);
    }
  }
}

function stopDrag() {
  if (dragId !== null) {
    savePrefs();
    dragId = null;
  }
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);
  render();
}

// Start
init();

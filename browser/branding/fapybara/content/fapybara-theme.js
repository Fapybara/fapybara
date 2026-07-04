/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

try {
  const { Services } = ChromeUtils.importESModule("resource://gre/modules/Services.sys.mjs");

  if (!globalThis.FapybaraThemeManager) {
    class FapybaraThemeManagerClass {
      constructor() {
        this.initialized = false;
        this.savedSettings = false;
        this.userInteracted = false;
        
        this.sidebarBg = "#181818";
        this.accentColor = "#d4af37";
        this.textColor = "#ffffff";
        this.borderRadius = "0px";
        this.gradientAngle = "90";
        this.pontos = [];

        this.themeObserver = {
          observe: (subject, topic, data) => {
            if (data.startsWith("fapybara.theme.")) {
              this.loadSettings();
              this.checkStatusAndApply();
            }
          }
        };

        this.init();
      }

      init() {
        this.loadSettings();
        
        // Wait for DOMContentLoaded to apply the theme to document.documentElement
        if (document.readyState === "loading") {
          window.addEventListener("DOMContentLoaded", () => {
            this.initialized = true;
            this.checkStatusAndApply();
          });
        } else {
          this.initialized = true;
          this.checkStatusAndApply();
        }

        Services.prefs.addObserver("fapybara.theme.", this.themeObserver);
        window.addEventListener("unload", () => {
          Services.prefs.removeObserver("fapybara.theme.", this.themeObserver);
        });
      }

      loadSettings() {
        try {
          this.gradientAngle = Services.prefs.getStringPref("fapybara.theme.gradient-angle", "90");
          this.borderRadius = Services.prefs.getStringPref("fapybara.theme.border-radius", "0px");
          this.sidebarBg = Services.prefs.getStringPref("fapybara.theme.sidebar-bg", "#181818");
          this.accentColor = Services.prefs.getStringPref("fapybara.theme.accent-color", "#d4af37");
          this.textColor = Services.prefs.getStringPref("fapybara.theme.text-color", "#ffffff");
          
          const pointsStr = Services.prefs.getStringPref("fapybara.theme.gradient-points", "[]");
          this.pontos = JSON.parse(pointsStr);
          
          if (!Array.isArray(this.pontos) || this.pontos.length === 0) {
            this.pontos = [
              { id: 1, x: 0, color: "#181818" },
              { id: 2, x: 100, color: "#d4af37" }
            ];
          }
        } catch (e) {
          console.error("Error loading theme mixer preferences inside manager:", e);
        }
      }

      updateSettings(newPoints, newAngle, newRadius) {
        this.pontos = newPoints;
        this.gradientAngle = String(newAngle);
        this.borderRadius = `${newRadius}px`;
        
        if (this.initialized) {
          this.checkStatusAndApply();
          this.saveSettings();
        } else {
          this.savedSettings = true;
        }
      }
      
      checkStatusAndApply() {
        this.applySettingsToDOM();
        if (this.savedSettings) {
          this.saveSettings();
        }
      }
      
      applySettingsToDOM() {
        try {
          const docEl = document.documentElement;
          if (!docEl) return;
          
          docEl.style.setProperty("--fapybara-sidebar-bg", this.sidebarBg);
          docEl.style.setProperty("--fapybara-accent-color", this.accentColor);
          docEl.style.setProperty("--fapybara-text-color", this.textColor);
          docEl.style.setProperty("--fapybara-border-radius", this.borderRadius);
          
          if (this.pontos && this.pontos.length > 0) {
            this.pontos.sort((a, b) => a.x - b.x);
            let gradString = `linear-gradient(${this.gradientAngle}deg, `;
            this.pontos.forEach((p, idx) => {
              gradString += `${p.color} ${p.x}%`;
              if (idx < this.pontos.length - 1) gradString += ", ";
            });
            gradString += ")";
            docEl.style.setProperty("--fapybara-gradient-bg", gradString);
          } else {
            docEl.style.setProperty("--fapybara-gradient-bg", this.sidebarBg);
          }
        } catch (e) {
          console.error("Error applying Fapybara theme to DOM inside manager:", e);
        }
      }

      saveSettings() {
        try {
          Services.prefs.setStringPref("fapybara.theme.gradient-angle", String(this.gradientAngle));
          Services.prefs.setStringPref("fapybara.theme.border-radius", this.borderRadius);
          Services.prefs.setStringPref("fapybara.theme.gradient-points", JSON.stringify(this.pontos));
          
          if (this.pontos.length > 0) {
            Services.prefs.setStringPref("fapybara.theme.sidebar-bg", this.pontos[0].color);
            if (this.pontos.length > 1) {
              Services.prefs.setStringPref("fapybara.theme.accent-color", this.pontos[this.pontos.length - 1].color);
            } else {
              Services.prefs.setStringPref("fapybara.theme.accent-color", this.pontos[0].color);
            }
          }
          this.savedSettings = false;
        } catch (e) {
          console.error("Error saving theme mixer preferences inside manager:", e);
        }
      }
    }
    
    globalThis.FapybaraThemeManager = new FapybaraThemeManagerClass();
  }
} catch (e) {
  console.error("Fapybara theme script error:", e);
}

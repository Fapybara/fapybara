# Fapybara Browser 🦦

Fapybara is a modern, custom web browser built on top of the Firefox platform, designed for visual excellence, performance, and user-centric styling. It features a unique hybrid workspace layout inspired by modern design trends (Opera One and Arc) and integrates a clean, local Capybara Search homepage.

---

## Key Features 🌟

* **Capybara Search Homepage**: A local, lightning-fast startup and new-tab search page powered by Google Search, designed with a premium glassmorphic dark-mode interface.
* **Opera One & Arc-Inspired Layout**:
  * **Vertical Tabs**: Enabled by default to maximize vertical screen real estate.
  * **Floating Viewport**: The main page viewport floats as a rounded card with a soft drop shadow, creating a modern depth-of-field effect.
  * **Custom Background Wallpaper**: Custom desktop-class wallpaper applied natively behind the workspace.
* **Pre-integrated Custom Theme**: Custom Fapybara navy and gold/beige theme (created with Firefox Color) built directly into the default browser skin.

---

## How to Build & Run 🚀

This project uses the Mozilla Build system. Follow these instructions to compile and launch Fapybara:

### Prerequisites
Make sure you are running in the **Mozilla Build environment** (MSYS2/MinGW console on Windows).

### 1. Regenerate Build Configuration
Whenever new files or package listings (`jar.mn`) are modified, regenerate the build configuration:
```bash
./mach build-backend
```

### 2. Compile Fapybara
To quickly compile styling, preferences, and chrome resource changes without recompiling the entire C++/Rust core:
```bash
./mach build faster
```
For a full compilation (after core changes):
```bash
./mach build
```

### 3. Run the Browser
Launch your compiled Fapybara browser:
```bash
./mach run
```

---

## Repository Maintenance & Security Patches 🛡️

Fapybara tracks the stable **Firefox ESR (Extended Support Release)** branch to easily ingest security patches released by Mozilla with minimal downstream code merge conflicts. 

Refer to the [Repository Maintenance Plan](repository_maintenance_plan.md) for detailed instructions on configuring remotes, merging/rebasing security commits, and pulling upstream changes.

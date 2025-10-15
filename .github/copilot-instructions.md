# Copilot Instructions for softgames-case

## Project Overview
This is a browser-based game framework using TypeScript, Vite, PIXI.js (graphics), and GSAP (animation). The architecture is scene-driven, with each game or feature implemented as a separate scene. The entry point is `src/main.ts`, which initializes the PIXI application and loads the initial scene via the `SceneManager` singleton.

## Key Architectural Patterns
- **Scene System:**
  - All scenes extend `BaseScene` (`src/utils/scenes/BaseScene.ts`).
  - Scene switching is managed by `SceneManager` (`src/utils/scenes/SceneManager.ts`).
  - Scenes are identified by static `Id` properties (e.g., `Menu.Id`, `AceOfShadows.Id`).
  - To add a new scene, implement a class extending `BaseScene`, add its Id, and update `SceneManager.getScene()`.
- **UI Components:**
  - Custom UI elements (e.g., `Button`) are in `src/ui/` and use PIXI primitives.
- **Game Logic:**
  - Game-specific logic is organized by feature (e.g., `ace-of-shadows`, `magic-words`) under `src/scenes/`.
  - Card and stack logic for games is split into controller, model, and view files (see `src/scenes/ace-of-shadows/card/` and `stack/`).
- **Singletons:**
  - Logger and SceneManager use singleton patterns for global access.

## Developer Workflows
- **Build:** `npm run build` (TypeScript + Vite)
- **Dev Server:** `npm run dev` (Vite)
- **Preview:** `npm run preview` (Vite preview)
- **No test scripts or test framework detected.**

## Conventions & Patterns
- **Strict TypeScript:**
  - Enforced by `tsconfig.json` (strict, noUnusedLocals, noUnusedParameters, etc.).
- **Module Structure:**
  - All code is in `src/`, grouped by feature and utility type.
- **PIXI.js Usage:**
  - All rendering and UI logic uses PIXI.js containers and graphics.
- **GSAP Animations:**
  - GSAP is used for animations, with `PixiPlugin` registered in `main.ts`.
- **No global state outside singletons.**
- **No external API calls detected (see `src/utils/api/Client.ts` for future integration).**

## Integration Points
- **External Libraries:**
  - `pixi.js` for rendering
  - `gsap` for animation
- **No backend or network integration currently implemented.**

## Example: Adding a New Scene
1. Create a new class in `src/scenes/[your-scene]/` extending `BaseScene`.
2. Add a static `Id` property.
3. Update `SceneManager.getScene()` to recognize the new Id.
4. Add a button in `Menu.ts` to load your scene.

## References
- Entry: `src/main.ts`
- Scene system: `src/utils/scenes/`
- UI: `src/ui/`
- Game logic: `src/scenes/`
- Animation: `gsap`, `PixiPlugin`

---
**If any section is unclear or missing, please specify what needs improvement.**

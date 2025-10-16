# Pixi MVC Structure - softgames-case

A small browser-based game framework built with TypeScript, Vite, PIXI.js and GSAP. The project demonstrates a scene-driven architecture where each feature (game) is implemented as a separate scene. It includes basic UI components, a scene manager, simple game logic (Ace of Shadows), and a chat-like demo (Magic Words).

## Features
- Scene system (BaseScene + SceneManager)
- Custom UI primitives (Button, BackButton, FullscreenButton)
- Simple game scene: Ace of Shadows (card stacks & animations)
- Chat demo: Magic Words (messages, avatars, scrolling)
- Particle effect helper (FireParticleEffect)
- GSAP integration for PIXI animations

## Project layout
- `src/` - TypeScript source code
	- `main.ts` - App entry (PIXI app + scene manager)
	- `scenes/` - All scenes (menu, ace-of-shadows, magic-words, ...)
	- `ui/` - Reusable UI elements (Button, FullscreenButton)
	- `utils/` - Helpers and singletons (Logger, SceneManager, Timer, Effects)

## Quick start
1. Install dependencies:

```powershell
npm install
```

2. Run development server (hot reload):

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
```

4. Preview a production build:

```powershell
npm run preview
```

## Notes for developers
- TypeScript is strict; pay attention to `tsconfig.json` settings like `noUnusedLocals` and `noUnusedParameters`.
- Scenes should extend `BaseScene` and provide `load()` / `unload()` async methods.
- Scene switching is handled by `SceneManager.createInstance(app).loadScene(sceneId)`.

## Adding a new scene
1. Create a folder under `src/scenes/your-scene` and add a class that extends `BaseScene`.
2. Add a static `Id` property on your scene class and register it in `SceneManager.getScene()`.
3. Add a button to `Menu.ts` or call `SceneManager.Instance.loadScene(YourScene.Id)` programmatically.

## Testing / debugging
- Use the browser devtools for rendering/logging errors (Logger prints to console).
- For visual issues, start `npm run dev` and inspect the canvas size and renderer settings in `main.ts`.

## Contributing
- Keep changes small and focused.
- Preserve architecture patterns (scene-per-feature, controller/model/view split where used).

If you'd like, I can also add inline top-of-file comments describing the purpose and usage of each source file — tell me to proceed and I will annotate files in batches.


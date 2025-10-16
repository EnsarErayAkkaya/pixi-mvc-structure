/**
 * Application entry point
 * - Creates the PIXI.Application, registers GSAP PixiPlugin and loads the initial scene (Menu).
 * - Usage: run `npm run dev` and open the served page.
 */
import * as PIXI from 'pixi.js';
import { SceneManager } from './utils/scenes/SceneManager';
import { Menu } from './scenes/Menu';
import { PixiPlugin } from "gsap/PixiPlugin";
import { gsap } from 'gsap';
import { FpsCounter } from './ui/FpsCounter';

// pixi.js version 7.4.3

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 0x222222,
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view as HTMLCanvasElement);

const sceneManager = SceneManager.createInstance(app);

sceneManager.loadScene(Menu.Id)

window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

// register the plugin
gsap.registerPlugin(PixiPlugin);

// give the plugin a reference to the PIXI object
PixiPlugin.registerPIXI(PIXI);

const fpsCounter = new FpsCounter(app);

app.stage.addChild(fpsCounter);

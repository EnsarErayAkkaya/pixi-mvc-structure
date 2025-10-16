import * as PIXI from "pixi.js";
import { BackButton } from "../../ui/BackButton";
import { FullscreenButton } from "../../ui/FullscreenButton";
import { SceneManager } from "./SceneManager";
import { Menu } from "../../scenes/Menu";

/**
 * Base class for all scenes. Handles adding back and fullscreen buttons.
 */
export abstract class BaseScene extends PIXI.Container {
    protected app: PIXI.Application;

    /**
     * Creates a new BaseScene and adds it to the stage.
     * @param app The PIXI.Application instance.
     */
    constructor(app: PIXI.Application) {
        super();
        this.app = app;
        this.addFullscreenButton();
    }

    abstract load(): Promise<void>;
    abstract unload(): Promise<void>;
    /**
     * Adds a back button to the scene.
     */
    protected addBackButton() {
        const backBtn = new BackButton(() => {
            SceneManager.Instance.loadScene(Menu.Id);
        });
        backBtn.x = 5;
        backBtn.y = 10;
        backBtn.zIndex = 1000;
        this.addChild(backBtn);
        this.sortChildren();
    }

    /**
     * Adds a fullscreen button to the scene.
     */
    protected addFullscreenButton() {
        const fullscreenBtn = new FullscreenButton(this.app);
        fullscreenBtn.x = this.app.screen.width - fullscreenBtn.width - 10;
        fullscreenBtn.y = 10;
        fullscreenBtn.zIndex = 1000;
        this.addChild(fullscreenBtn);
        this.sortChildren();
    }
}
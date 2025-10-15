import * as PIXI from 'pixi.js';
import { Logger } from "../logger/Logger";
import type { BaseScene } from "./BaseScene";
import { Menu } from '../../scenes/Menu';
import { AceOfShadows } from '../../scenes/ace-of-shadows/AceOfShadows';
import { MagicWords } from '../../scenes/magic-words/MagicWords';

export class SceneManager {
    private app: PIXI.Application;
    private currentScene: BaseScene | null = null;

    // SINGLETON
    private static _instance: SceneManager;

    public static get Instance() {
        return this._instance;
    }

    public static createInstance(app: PIXI.Application): SceneManager {
        return this._instance = new SceneManager(app);
    }
    // SINGLETON

    constructor(app: PIXI.Application) {
        this.app = app;
    }

    async loadScene(sceneId: string): Promise<void> {
        const nextScene = this.getScene(sceneId);

        if (!nextScene) {
            console.warn(`Scene "${sceneId}" not found.`);
            return;
        }

        // Unload current scene
        if (this.currentScene) {
            await this.currentScene.unload();
            this.app.stage.removeChild(this.currentScene);
        }

        this.currentScene = nextScene;
        await nextScene.load();
        this.app.stage.addChild(this.currentScene);

        Logger.Instance.log(`Scene "${sceneId}" loaded successfully.`);
    }

    private getScene(sceneId: string): BaseScene | null {
        if (sceneId == Menu.Id)
            return new Menu(this.app);
        else if (sceneId == AceOfShadows.Id)
            return new AceOfShadows(this.app);
        else if (sceneId == MagicWords.Id)
            return new MagicWords(this.app);

        return null;
    }

    getCurrentScene(): BaseScene | null {
        return this.currentScene;
    }
}
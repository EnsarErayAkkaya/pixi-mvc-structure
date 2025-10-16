import * as PIXI from "pixi.js";
import { BaseScene } from "../utils/scenes/BaseScene";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/scenes/SceneManager";
import { AceOfShadows } from "./ace-of-shadows/AceOfShadows";
import { MagicWords } from "./magic-words/MagicWords";

export class Menu extends BaseScene {
    static Id = "menu";
    scenes = [
        { name: "Ace of Shadows", key: AceOfShadows.Id },
        { name: "Magic Words", key: MagicWords.Id },
        { name: "Phoenix Flame", key: "phoenixflame" },
    ];

    constructor(app: PIXI.Application) {
        super(app);
    }

    load(): Promise<void> {

        const buttonWidth = 300;
        const buttonHeight = 60;
        const gap = 30;
        const startY = (this.app.renderer.height * 0.5) - ((((buttonHeight + gap) * this.scenes.length) - gap) / 2);

        // Label
        const text = new PIXI.Text("Menu", {
            fontFamily: "Arial",
            fontSize: 50,
            fill: "white",
            align: "center",
        });
        text.anchor.set(0.5);
        text.x = this.app.view.width / 2;
        text.y = startY - gap - 25;
        this.addChild(text);

        this.scenes.forEach((scene, i) => {
            const btn = new Button(
                scene.name,
                buttonWidth,
                buttonHeight,
                {
                    fontSize: 28,
                    onClick: () => SceneManager.Instance.loadScene(scene.key),
                });
            btn.x = this.app.renderer.width / 2 - buttonWidth / 2;
            btn.y = startY + i * (buttonHeight + gap);
            this.addChild(btn);
        });

        return Promise.resolve();
    }

    unload(): Promise<void> {
        return Promise.resolve();
    }
}
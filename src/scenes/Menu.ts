/**
 * Menu scene
 * - Main menu that lists available scenes (Ace of Shadows, Magic Words, Phoenix Flame).
 * - Usage: SceneManager.Instance.loadScene(Menu.Id) will create this scene.
 */
import * as PIXI from "pixi.js";
import { BaseScene } from "../utils/scenes/BaseScene";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/scenes/SceneManager";
import { AceOfShadows } from "./ace-of-shadows/AceOfShadows";
import { MagicWords } from "./magic-words/MagicWords";
import { PhoenixFlame } from "./phoenix-flame/PhoenixFlame";
import { gsap } from "gsap";

export class Menu extends BaseScene {
    static Id = "menu";

    private scenes = [
        { name: "Ace of Shadows", key: AceOfShadows.Id },
        { name: "Magic Words", key: MagicWords.Id },
        { name: "Phoenix Flame", key: PhoenixFlame.Id },
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

            if (i % 2 == 0) {
                gsap.from(btn, { pixi: { x: this.app.renderer.width, alpha: 0 }, duration: 1 });
            }
            else {
                gsap.from(btn, { pixi: { x: 0, alpha: 0 }, duration: 1 });
            }
            this.addChild(btn);
        });

        gsap.from(text, { pixi: { y: 0, alpha: 0 }, duration: 1 });

        return Promise.resolve();
    }

    unload(): Promise<void> {
        return Promise.resolve();
    }
}
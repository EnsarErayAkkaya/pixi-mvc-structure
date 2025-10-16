/**
 * Button UI component
 * - Simple PIXI container that displays a rounded rectangle and centered label.
 * - Usage: new Button(text, width, height, { onClick: () => {} }) and add to a scene/container.
 * - Interactive: emits pointer events and supports hover/click visuals.
 */
import * as PIXI from "pixi.js";

export class Button extends PIXI.Container {
    private _background: PIXI.Graphics;
    private _label: PIXI.Text;
    private _defaultColor: number;
    private _hoverColor: number;
    private _clickHandler?: () => void;

    constructor(
        text: string,
        width: number = 150,
        height: number = 50,
        options?: {
            fontSize?: number;
            textColor?: number;
            buttonColor?: number;
            hoverColor?: number;
            onClick?: () => void;
        }
    ) {
        super();

        this._defaultColor = options?.buttonColor ?? 0x3498db;
        this._hoverColor = options?.hoverColor ?? 0x5dade2;
        this._clickHandler = options?.onClick;

        // Create background rectangle
        this._background = new PIXI.Graphics()
            .beginFill(this._defaultColor)
            .drawRoundedRect(0, 0, width, height, 10)
            .endFill();

        // Center the label
        this._label = new PIXI.Text(text, {
            fill: options?.textColor ?? 0xffffff,
            fontSize: options?.fontSize ?? 28,
            fontFamily: "Arial",
            fontWeight: "bold",
        });

        this._label.anchor.set(0.5);
        this._label.x = width / 2;
        this._label.y = height / 2;

        // Enable interaction
        this.interactive = true;
        this.cursor = "pointer";

        // Add hover and click events
        this.on("pointerover", this.onHover.bind(this));
        this.on("pointerout", this.onOut.bind(this));
        this.on("pointerdown", this.onDown.bind(this));
        this.on("pointerup", this.onUp.bind(this));

        this.addChild(this._background, this._label);
    }

    private onHover() {
        this._background.tint = this._hoverColor;
    }

    private onOut() {
        this._background.tint = 0xffffff;
        this._background.beginFill(this._defaultColor).drawRoundedRect(0, 0, this._background.width, this._background.height, 10).endFill();
    }

    private onDown() {
        this._background.alpha = 0.8;
    }

    private onUp() {
        this._background.alpha = 1;
        if (this._clickHandler) this._clickHandler();
    }
}
/**
 * CardView
 * - Visual sprite representing a playing card. Created by CardController with a CardModel.
 * - Usage: Do not instantiate directly in scenes; use CardController which wraps this view.
 */
import * as PIXI from "pixi.js";
import { CardController } from "./CardController";
import { DropShadowFilter } from 'pixi-filters';
import type { CardModel } from "./CardModel";

export class CardView extends PIXI.Sprite {
    text: PIXI.Text;

    constructor(cardModel: CardModel) {
        const texture = PIXI.Texture.from("assets/card.png");
        super(texture);

        this.width = CardController.cardWidth;
        this.height = CardController.cardHeigth;

        this.anchor.set(0.5);

        this.text = new PIXI.Text(cardModel.cardIndex.toString(), {
            fontFamily: "Arial",
            fontSize: 150,
            fill: "black",
            align: "center",
            wordWrap: true,
            wordWrapWidth: this.width,
        });

        this.text.anchor.set(0.5);

        this.addChild(this.text);
    }

    toggleShadow(enabled: boolean) {
        if (enabled) {
            this.filters = [
                new DropShadowFilter({
                    color: 0x000000,
                    alpha: 0.25,
                    blur: 4,
                    offset: { x: 0, y: 10 },
                }),
            ];
        } else {
            this.filters = [];
        }
    }
}
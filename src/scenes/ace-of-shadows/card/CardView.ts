import * as PIXI from "pixi.js";
import { CardController } from "./CardController";

export class CardView extends PIXI.Sprite {
    text: PIXI.Text;

    constructor(cardIndex: number) {
        const texture = PIXI.Texture.from("assets/card.png");
        super(texture);

        this.width = CardController.cardWidth;
        this.height = CardController.cardHeigth;

        this.anchor.set(0.5);

        this.text = new PIXI.Text(cardIndex.toString(), {
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
}
import { CardAnimator, type JumpAnimConfig } from "./CardAnimator";
import { CardModel } from "./CardModel";
import { CardView } from "./CardView";
import * as PIXI from "pixi.js";

export class CardController {
    private _cardModel: CardModel;
    private _cardView: CardView;
    private _cardAnimator: CardAnimator

    static cardWidth: number = 60;
    static cardHeigth: number = 90;

    constructor(cardIndex: number) {
        this._cardModel = new CardModel(cardIndex);
        this._cardView = new CardView(cardIndex);
        this._cardAnimator = new CardAnimator(this._cardView);
    }

    setCardPosition(x: number, y: number) {
        this._cardView.position.set(x, y);
    }

    setZIndex(zIndex: number) {
        this._cardView.zIndex = zIndex
    }

    maximizeZIndex() {
        this.setZIndex(Number.MAX_VALUE);
    }

    animateCard(config: JumpAnimConfig) {
        this._cardAnimator.JumpToPosition(config)
    }

    setParent(container: PIXI.Container) {
        this._cardView.setParent(container);
    }
}
/**
 * CardController
 * - Controller that ties CardModel and CardView and exposes convenience methods (position, zIndex, animate).
 * - Usage: new CardController(index), then setParent(container), setCardPosition(x,y), animateCard(...)
 */
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
        this._cardView = new CardView(this._cardModel);
        this._cardAnimator = new CardAnimator(this._cardView);
    }

    setCardPosition(x: number, y: number) {
        this._cardView.position.set(x, y);
    }

    setZIndex(zIndex: number) {
        this._cardView.zIndex = zIndex
    }

    getZIndex(): number {
        return this._cardView.zIndex
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

    getCardIndex() {
        return this._cardModel.cardIndex
    }

    dispose() {
        this._cardAnimator.dispose();
    }
}
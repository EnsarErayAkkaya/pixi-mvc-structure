import { CardController } from "../card/CardController";
import { StackModel } from "./StackModel";
import { StackView } from "./StackView";
import * as PIXI from "pixi.js";

export class StackController {
    private _stackModel: StackModel;
    private _stackView: StackView;

    private _cardDistance: number = 4;

    get parent(): PIXI.Container {
        return this._stackView.parent;
    }
    get cardCount(): number {
        return this._stackModel.cards.length;
    }

    constructor() {
        this._stackModel = new StackModel();
        this._stackView = new StackView();
    }

    populate(cardCount: number) {
        for (let i = 0; i < cardCount; i++) {
            const card = new CardController(i + 1);

            this.pushCard(card);
        }
    }

    pushCard(card: CardController) {

        card.setParent(this._stackView);

        const { x, y } = this.getLocalNextCardPosition();
        card.setCardPosition(x, y);

        card.setZIndex(-this._stackModel.cards.length);

        this._stackModel.push(card);
    }

    popCard(): CardController | undefined {
        return this._stackModel.Pop();
    }

    setStackPosition(x: number, y: number) {
        this._stackView.position.set(x, y);
    }

    getLocalNextCardPosition(): { x: number, y: number } {
        const x = 0;
        const y = -this._stackModel.cards.length * this._cardDistance;

        return { x, y };
    }

    getNextCardPosition(): { x: number, y: number } {
        const x = this._stackView.x;
        const y = this._stackView.y - (this._stackModel.cards.length * this._cardDistance);

        return { x, y };
    }

    hasCards(): boolean {
        return this._stackModel.cards.length > 0;
    }

    setParent(container: PIXI.Container) {
        this._stackView.setParent(container);
    }
}
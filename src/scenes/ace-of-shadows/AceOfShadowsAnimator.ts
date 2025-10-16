import * as PIXI from "pixi.js";
import { GameTimer } from "../../utils/timer/GameTimer";
import type { StackController } from "./stack/StackController";
import type { CardController } from "./card/CardController";

export class AceOfShadowsAnimator {
    private _timer: GameTimer;
    private _stacks: StackController[];
    private _app: PIXI.Application;
    private _currentStack = 0;
    private _animatingCards: CardController[] = [];

    constructor(app: PIXI.Application, stacks: StackController[]) {

        this._stacks = stacks;
        this._timer = new GameTimer(1);
        this._app = app;

        app.ticker.add(this._tick);
    }

    private _tick = () => {
        const deltaTime = this._app.ticker.deltaMS / 1000; // seconds

        this._timer.update(deltaTime, () => {

            const stack = this._stacks[this._currentStack];
            if (stack.hasCards()) {

                const card = stack.popCard();
                if (card) {
                    card?.setParent(stack.parent);
                    const { x: originalX, y: originalY } = stack.getNextCardPosition();
                    card?.setCardPosition(originalX, originalY);

                    this._animatingCards.push(card);
                    // assign zIndex so earlier animating cards are above later ones
                    card.setZIndex(stack.cardCount);

                    const targetStackIndex = this._selectRandomStack(this._currentStack);
                    const targetStack = this._stacks[targetStackIndex];

                    let { x, y } = targetStack.getNextCardPosition();

                    card?.animateCard({
                        to: { x, y },
                        duration: 2,
                        onComplete: () => {
                            targetStack.pushCard(card);
                            const cardIndex = this._animatingCards.findIndex(s => s === card);

                            if (cardIndex != -1) {
                                this._animatingCards.splice(cardIndex, 1);
                            }
                        }
                    });
                }
                return;
            }
            else {
                this._currentStack = this._selectRandomStack(this._currentStack);
            }
        });
    }

    dispose() {
        this._app.ticker.remove(this._tick);

        this._animatingCards.forEach(card => card.dispose());
    }

    private _selectRandomStack(except: number): number {
        const indexes: number[] = [];

        for (let i = 0; i < this._stacks.length; i++) {

            if (i != except)
                indexes.push(i);
        }

        return indexes[Math.floor(Math.random() * indexes.length)];
    }
}
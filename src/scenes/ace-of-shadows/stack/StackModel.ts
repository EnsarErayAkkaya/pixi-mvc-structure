/**
 * StackModel
 * - Simple data model holding a list of CardControllers representing a stack.
 */
import type { CardController } from "../card/CardController";

export class StackModel {
    cards: CardController[] = [];

    Pop() : CardController | undefined
    {
        return this.cards.pop();
    }

    push(card: CardController)
    {
        this.cards.push(card);
    }
}
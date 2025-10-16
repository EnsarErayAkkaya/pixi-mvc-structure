/**
 * CardModel
 * - Small data model representing a card (index, state can be extended).
 * - Usage: new CardModel(cardIndex) used by CardController to create views.
 */
export class CardModel{
    cardIndex:number;

    constructor(cardIndex:number) {
        this.cardIndex = cardIndex;
    }
}
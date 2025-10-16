import * as PIXI from "pixi.js";
import { BaseScene } from "../../utils/scenes/BaseScene";
import { StackController } from "./stack/StackController";
import { CardController } from "./card/CardController";
import { AceOfShadowsAnimator } from "./AceOfShadowsAnimator";

export class AceOfShadows extends BaseScene {
    static Id = "ace_of_shadows";
    private _animator: AceOfShadowsAnimator;
    private _stacks: StackController[] = [];

    constructor(app: PIXI.Application) {
        super(app);
        this.sortableChildren = true;
        this.addBackButton();
        this._animator = new AceOfShadowsAnimator(app, this._stacks);
    }

    load(): Promise<void> {
        const cardCount = 144;

        const stackPosY = this.app.renderer.height - CardController.cardHeigth * 1;

        const stack_1 = new StackController();
        stack_1.setParent(this)
        stack_1.setStackPosition(this.app.renderer.width * 0.25, stackPosY);
        stack_1.populate(cardCount);
        this._stacks.push(stack_1);

        const stack_2 = new StackController();
        stack_2.setParent(this)
        stack_2.setStackPosition(this.app.renderer.width * 0.75, stackPosY);
        this._stacks.push(stack_2);

        return Promise.resolve();
    }

    unload(): Promise<void> {
        this._animator.dispose();
        return Promise.resolve();
    }
}
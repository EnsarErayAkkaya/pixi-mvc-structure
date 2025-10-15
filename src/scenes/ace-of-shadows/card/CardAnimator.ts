import { EffectManager } from "../../../utils/effects/EffectManager";
import type { CardView } from "./CardView";
import { gsap } from "gsap";

export interface JumpAnimConfig {
    to: { x: number, y: number };
    duration: number;
    onComplete: () => void;
}

export class CardAnimator {
    private _cardView: CardView;

    constructor(cardView: CardView) {
        this._cardView = cardView;
    }

    JumpToPosition(config: JumpAnimConfig) {
        /// scale animation
        const scaleTl = gsap.timeline();

        const originalScaleX = this._cardView.scale.x;
        const originalScaleY = this._cardView.scale.y;

        scaleTl
            .to(this._cardView, { pixi: { scaleX: originalScaleX * 3.5, scaleY: originalScaleY * 3.5 }, duration: config.duration * 0.7 })
            .to(this._cardView, { pixi: { scaleX: originalScaleX * 4.5, scaleY: originalScaleY * 4.5 }, duration: config.duration * 0.15 })
            .to(this._cardView, { pixi: { scaleX: originalScaleX, scaleY: originalScaleY }, duration: config.duration * 0.15 });


        /// position animation
        const positionTl = gsap.timeline();

        const originalX = this._cardView.x;
        const originalY = this._cardView.y;

        const middleX = (config.to.x + originalX) * 0.5;
        const middleY = (config.to.y + originalY) * 0.5;

        positionTl
            .to(this._cardView, { pixi: { x: middleX, y: middleY }, ease: "back.out", duration: config.duration * 0.7 })
            .to(this._cardView, {
                pixi: { x: config.to.x, y: config.to.y }, duration: config.duration * 0.2, delay: config.duration * 0.1,
                onComplete: () => {
                    config?.onComplete();
                    EffectManager.shakeCamera(20, 0.2);
                }
            });


        /// rotation animation

        /*gsap.to(this._cardView, { pixi: { rotation: -20 }, ease: "back.out", duration: config.duration * 0.6 });
        gsap.to(this._cardView, { pixi: { rotation: 10 }, ease: "sine.inOut", delay: config.duration * 0.6, duration: config.duration * 0.16 });
        gsap.to(this._cardView, { pixi: { rotation: 0 }, ease: "sine.in", delay: config.duration * 0.76, duration: config.duration * 0.24 });*/
    }
}
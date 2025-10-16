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
    private _scaleTimeline: gsap.core.Timeline | undefined = undefined;
    private _positionTimeline: gsap.core.Timeline | undefined = undefined;

    constructor(cardView: CardView) {
        this._cardView = cardView;
    }

    JumpToPosition(config: JumpAnimConfig) {

        this._cardView.toggleShadow(true);

        /// scale animation
        this._scaleTimeline = gsap.timeline();

        const originalScaleX = this._cardView.scale.x;
        const originalScaleY = this._cardView.scale.y;

        this._scaleTimeline
            .to(this._cardView, { pixi: { scaleX: originalScaleX * 3.5, scaleY: originalScaleY * 3.5 }, duration: config.duration * 0.7 })
            .to(this._cardView, { pixi: { scaleX: originalScaleX * 4.5, scaleY: originalScaleY * 4.5 }, duration: config.duration * 0.15 })
            .to(this._cardView, { pixi: { scaleX: originalScaleX, scaleY: originalScaleY }, duration: config.duration * 0.15 });


        /// position animation
        this._positionTimeline = gsap.timeline();

        const originalX = this._cardView.x;
        const originalY = this._cardView.y;

        const middleX = (config.to.x + originalX) * 0.5;
        const middleY = (config.to.y + originalY) * 0.5;

        const yDist = Math.abs(originalY - config.to.y);

        this._positionTimeline
            .to(this._cardView, { pixi: { x: middleX, y: middleY }, ease: "sine.inOut", duration: config.duration * 0.7 })
            .to(this._cardView, { pixi: { y: middleY - (yDist * 0.1) }, ease: "sine.inOut", duration: config.duration * 0.1 })
            .to(this._cardView, {
                pixi: { x: config.to.x, y: config.to.y }, duration: config.duration * 0.2,
                onComplete: () => {
                    this._cardView.toggleShadow(false);
                    config?.onComplete();
                    EffectManager.shakeCamera(20, 0.2);
                }
            });
    }

    dispose() {
        this._positionTimeline?.kill();
        this._scaleTimeline?.kill();
    }
}
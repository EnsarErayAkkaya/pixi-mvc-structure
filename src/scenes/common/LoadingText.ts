/**
 * LoadingText
 * - Small helper text used while loading remote data. Supports a LoadFailed animation.
 */
import * as PIXI from "pixi.js";
import { gsap } from "gsap";

export class LoadingText extends PIXI.Text {
    constructor(text: string) {
        super(text, {
            fontFamily: "Arial",
            fontSize: 35,
            fill: "white",
            align: "center",
        });
        this.anchor.set(0.5);
    }

    LoadFailed(text: string) {
        this.text = text;
        this.style.fill = "red";
        gsap.to(this, { 
            pixi: { scaleX: this.scale.x * 1.5, scaleY: this.scale.y * 1.5 }, 
            yoyo: true, repeat: -1, duration: 2 });
    }
}
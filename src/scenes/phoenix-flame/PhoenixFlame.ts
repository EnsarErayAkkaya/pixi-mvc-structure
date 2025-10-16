/**
 * PhoenixFlame scene
 * - Demo scene that shows the FireParticleEffect for visual testing.
 */
import * as PIXI from "pixi.js";
import { FireParticleEffect } from "../../utils/particleEffect/FireParticleEffect";
import { BaseScene } from "../../utils/scenes/BaseScene";

export class PhoenixFlame extends BaseScene {
    static Id = "phoenix_flame";
    private _fireParticle: FireParticleEffect | undefined;
    constructor(app: PIXI.Application) {
        super(app);
        this.addBackButton();
    }

    load(): Promise<void> {

        this._fireParticle = new FireParticleEffect(Array.from({ length: 8 }, (_, i) => `assets/fire/fire_${i + 1}.png`), 10);
        this.addChild(this._fireParticle);
        return Promise.resolve();
    }

    unload(): Promise<void> {
        this._fireParticle?.dispose();
        return Promise.resolve();
    }

}
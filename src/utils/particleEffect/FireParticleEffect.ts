import * as PIXI from "pixi.js";

type Particle = {
    sprite: PIXI.Sprite;
    vx: number;
    vy: number;
    life: number; // current life
    ttl: number; // time to live
    frameIndex: number;
    frameTimer: number;
}

/**
 * FireParticleEffect
 * - Uses per-particle state for position, velocity, lifetime and optional texture-frame animation.
 * - Keeps a regular Container for flexibility (ParticleContainer could be used for higher performance if only transform/alpha changes are needed).
 */
export class FireParticleEffect extends PIXI.Container {
    private _textures: PIXI.Texture[] = [];
    private _particles: Particle[] = [];
    private _tint: number = 0xffaa33;

    // configuration
    private _count: number;
    private _areaWidth: number;
    private _areaHeight: number;

    constructor(texturePaths: string[], count: number = 20, areaWidth = window.innerWidth, areaHeight = window.innerHeight) {
        super();

        if (!texturePaths || texturePaths.length === 0) throw new Error("FireParticleEffect requires at least one texture path");

        this._count = Math.max(1, count);
        this._areaWidth = areaWidth;
        this._areaHeight = areaHeight;

        // load textures
        for (const p of texturePaths) this._textures.push(PIXI.Texture.from(p));

        // create particles
        for (let i = 0; i < this._count; i++) {
            const tex = this._textures[i % this._textures.length];
            const s = new PIXI.Sprite(tex);
            s.anchor.set(0.5);
            s.blendMode = PIXI.BLEND_MODES.ADD;
            s.tint = this._tint;
            // initial placeholder size
            s.width = this._getSize();
            s.height = s.width;
            this.addChild(s);

            const particle: Particle = {
                sprite: s,
                vx: (Math.random() - 0.5) * 20,
                vy: -20 - Math.random() * 40,
                life: 0,
                ttl: 1 + Math.random() * 1.5,
                frameIndex: Math.floor(Math.random() * this._textures.length),
                frameTimer: 0,
            };
            // set initial texture frame
            particle.sprite.texture = this._textures[particle.frameIndex];

            // position at bottom across area
            const { x, y } = this._getPosition();;
            particle.sprite.x = x
            particle.sprite.y = y;

            this._particles.push(particle);
        }

        // start ticker
        PIXI.Ticker.shared.add(this._update, this);
    }

    _getSize(): number {
        const base = Math.max(40, Math.round(this._areaWidth * 0.5));
        return base * (0.6 + Math.random() * 0.8);
    }

    _getPosition(): { x: number, y: number } {
        return { x: (Math.random()) * this._areaWidth, y: (Math.random() * 0.5) * this._areaHeight };
    }

    /** Reset a particle to bottom position with random velocity/lifetime */
    private _respawn(p: Particle) {
        p.life = 0;
        p.ttl = 0.8 + Math.random() * 1.6;
        p.vx = (Math.random() - 0.5) * 30;
        p.vy = -40 - Math.random() * 80;
        p.frameIndex = Math.floor(Math.random() * this._textures.length);
        p.frameTimer = 0;
        p.sprite.texture = this._textures[p.frameIndex];

        const { x, y } = this._getPosition();;
        p.sprite.x = x
        p.sprite.y = y;

        p.sprite.width = this._getSize();
        p.sprite.height = p.sprite.width;
        p.sprite.alpha = 0.9;
    }

    private _update = () => {
        // dt is frames; convert to seconds using ticker.deltaMS if needed
        const seconds = (PIXI.Ticker.shared.deltaMS) / 1000;

        for (const p of this._particles) {
            p.life += seconds;

            // animate frame every 60ms
            p.frameTimer += seconds;
            if (p.frameTimer > 0.06) {
                p.frameTimer = 0;
                p.frameIndex = (p.frameIndex + 1) % this._textures.length;
                p.sprite.texture = this._textures[p.frameIndex];
            }

            // integrate motion
            // small horizontal drift and upward velocity
            p.vx *= 0.99; // slight air friction
            p.vy += 10 * seconds; // gravity (positive pulls down, small to slow ascent)
            p.sprite.x += p.vx * seconds;
            p.sprite.y += p.vy * seconds;

            // fade out as life approaches ttl
            const t = p.life / p.ttl;
            p.sprite.alpha = Math.max(0, 1 - t);

            // if out of life or out of bounds, respawn
            if (p.life >= p.ttl || p.sprite.y < -50 || Math.abs(p.sprite.x) > this._areaWidth) {
                this._respawn(p);
            }
        }
    }

    dispose() {
        PIXI.Ticker.shared.remove(this._update, this);
        // destroy sprites
        this._particles.forEach(p => {
            p.sprite.destroy({ texture: false, baseTexture: false });
        });
        this._particles = [];
        // keep textures cached by PIXI.Texture.from; do not destroy them globally here
    }
}


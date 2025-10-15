export class GameTimer {
    private _maxTime: number;
    private _time: number;

    constructor(maxTime: number) {
        this._maxTime = maxTime;
        this._time = 0;
    }

    get isTimeElapsed(): boolean {
        return this._time >= this._maxTime;
    }

    get time(): number {
        return this._time;
    }

    get maxTime(): number {
        return this._maxTime;
    }

    set maxTime(value: number) {
        this._maxTime = value;
    }

    reset(): void {
        this._time = 0;
    }

    updateAsCooldown(delta: number): void {
        this._time += delta;
    }

    update(delta: number, onElapsed: () => void): void {
        this._time += delta;
        while (this._time >= this._maxTime) {
            this._time -= this._maxTime;
            onElapsed();
        }
    }
}

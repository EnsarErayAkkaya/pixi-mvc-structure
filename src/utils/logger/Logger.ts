export class Logger {
    // SINGLETON
    private static _instance: Logger;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
    // SINGLETON

    log(...args: any[]): void {
        console.log("[DEBUG]", ...args);
    }

    warn(...args: any[]): void {
        console.warn("[WARN]", ...args);
    }
}
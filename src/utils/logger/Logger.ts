/**
 * Logger singleton
 * - Small wrapper around console.log/warn used across the project.
 * - Usage: Logger.Instance.log('message')
 */
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
/**
 * SignalBus
 * - Simple pub/sub event bus for cross-component signaling.
 * - Usage: SignalBus.on('event', handler) and SignalBus.emit('event', payload).
 * - This file provides a very small implementation used by the app where needed.
 */

type Handler = (...args: any[]) => void;

export class SignalBus {
	private static _instance: SignalBus;
	private handlers: Map<string, Handler[]> = new Map();

	public static get Instance() {
		return this._instance || (this._instance = new SignalBus());
	}

	on(event: string, handler: Handler) {
		const arr = this.handlers.get(event) || [];
		arr.push(handler);
		this.handlers.set(event, arr);
	}

	off(event: string, handler?: Handler) {
		if (!handler) { this.handlers.delete(event); return; }
		const arr = this.handlers.get(event);
		if (!arr) return;
		this.handlers.set(event, arr.filter(h => h !== handler));
	}

	emit(event: string, ...args: any[]) {
		const arr = this.handlers.get(event) || [];
		for (const h of arr) h(...args);
	}
}

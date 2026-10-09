import { replaceState } from '$app/navigation';
import { apps, type AppId } from './apps.ts';

export type Win = {
	id: AppId;
	x: number;
	y: number;
	w: number;
	h: number;
	z: number;
	minimized: boolean;
	maximized: boolean;
};

const TASKBAR = 40;

/** Window manager: one window per app, z-order by focus. */
class WindowManager {
	windows = $state<Win[]>([]);
	activeId = $state<AppId | null>(null);
	startOpen = $state(false);
	#z = 10;
	#cascade = 0;

	get compact(): boolean {
		return typeof window !== 'undefined' && window.innerWidth < 720;
	}

	open(id: AppId) {
		this.startOpen = false;
		const existing = this.windows.find((w) => w.id === id);
		if (existing) {
			existing.minimized = false;
			this.focus(id);
			return;
		}
		const app = apps[id];
		const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
		const vh = typeof window !== 'undefined' ? window.innerHeight - TASKBAR : 760;
		const w = Math.min(app.size[0], vw - 24);
		const h = Math.min(app.size[1], vh - 24);
		const step = (this.#cascade++ % 6) * 28;
		const x = Math.max(12, Math.round((vw - w) / 2 - 80 + step));
		const y = Math.max(12, Math.round((vh - h) / 2 - 60 + step));
		this.windows.push({ id, x, y, w, h, z: ++this.#z, minimized: false, maximized: this.compact });
		this.activeId = id;
		this.#syncHash(id);
	}

	focus(id: AppId) {
		const win = this.windows.find((w) => w.id === id);
		if (!win) return;
		win.z = ++this.#z;
		this.activeId = id;
		this.#syncHash(id);
	}

	close(id: AppId) {
		this.windows = this.windows.filter((w) => w.id !== id);
		if (this.activeId === id) {
			const top = [...this.windows].filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];
			this.activeId = top?.id ?? null;
			this.#syncHash(this.activeId);
		}
	}

	minimize(id: AppId) {
		const win = this.windows.find((w) => w.id === id);
		if (!win) return;
		win.minimized = true;
		if (this.activeId === id) this.activeId = null;
	}

	toggleMaximize(id: AppId) {
		const win = this.windows.find((w) => w.id === id);
		if (win && !this.compact) win.maximized = !win.maximized;
	}

	/** Taskbar button behaviour: restore, focus, or minimise. */
	taskbarClick(id: AppId) {
		const win = this.windows.find((w) => w.id === id);
		if (!win) return this.open(id);
		if (win.minimized) {
			win.minimized = false;
			this.focus(id);
		} else if (this.activeId === id) {
			this.minimize(id);
		} else {
			this.focus(id);
		}
	}

	move(id: AppId, x: number, y: number) {
		const win = this.windows.find((w) => w.id === id);
		if (!win) return;
		const vw = window.innerWidth;
		const vh = window.innerHeight - TASKBAR;
		win.x = Math.min(Math.max(x, 80 - win.w), vw - 80);
		win.y = Math.min(Math.max(y, 0), vh - 32);
	}

	closeAll() {
		this.windows = [];
		this.activeId = null;
		this.startOpen = false;
		this.#syncHash(null);
	}

	/** Keeps #about, #projects ... in the URL so windows are linkable. */
	#syncHash(id: AppId | null) {
		if (typeof location === 'undefined') return;
		try {
			replaceState(id ? `#${id}` : location.pathname, {});
		} catch {
			// router not started yet (first paint); the hash is cosmetic, so ignore
		}
	}
}

export const wm = new WindowManager();

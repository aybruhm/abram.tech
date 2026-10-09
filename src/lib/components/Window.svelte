<script lang="ts">
	import { apps } from '#lib/apps.ts';
	import { wm, type Win } from '#lib/wm.svelte.ts';
	import Icon from './Icon.svelte';

	let { win }: { win: Win } = $props();

	const app = $derived(apps[win.id]);
	const active = $derived(wm.activeId === win.id);
	const Body = $derived(app.component);

	let drag: { dx: number; dy: number; pointer: number } | null = null;

	function onPointerDown(e: PointerEvent) {
		wm.focus(win.id);
		if (win.maximized || e.button !== 0) return;
		if ((e.target as HTMLElement).closest('button')) return;
		drag = { dx: e.clientX - win.x, dy: e.clientY - win.y, pointer: e.pointerId };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!drag || e.pointerId !== drag.pointer) return;
		wm.move(win.id, e.clientX - drag.dx, e.clientY - drag.dy);
	}

	function onPointerUp() {
		drag = null;
	}
</script>

<div
	class="window"
	class:active
	class:maximized={win.maximized}
	class:minimized={win.minimized}
	style:left="{win.x}px"
	style:top="{win.y}px"
	style:width="{win.w}px"
	style:height="{win.h}px"
	style:z-index={win.z}
	role="dialog"
	aria-label={app.title}
	onpointerdowncapture={() => wm.focus(win.id)}
>
	<!-- svelte-ignore a11y_no_static_element_interactions (drag handle; buttons inside are the accessible controls) -->
	<header
		class="titlebar"
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
		ondblclick={() => wm.toggleMaximize(win.id)}
	>
		<span class="title-icon"><Icon name={app.icon} size={16} /></span>
		<h2>{app.title}</h2>
		<div class="caption">
			<button class="cap min" aria-label="Minimise" onclick={() => wm.minimize(win.id)}>
				<svg viewBox="0 0 10 10"><rect x="1" y="7" width="8" height="2" /></svg>
			</button>
			<button class="cap max" aria-label={win.maximized ? 'Restore' : 'Maximise'} onclick={() => wm.toggleMaximize(win.id)}>
				{#if win.maximized}
					<svg viewBox="0 0 10 10"><path d="M3 1h6v6H7V3H3z M1 3h6v6H1z" fill-rule="evenodd" /></svg>
				{:else}
					<svg viewBox="0 0 10 10"><path d="M1 1h8v8H1z M2.5 3.5v4h5v-4z" fill-rule="evenodd" /></svg>
				{/if}
			</button>
			<button class="cap close" aria-label="Close" onclick={() => wm.close(win.id)}>
				<svg viewBox="0 0 10 10"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7" /></svg>
			</button>
		</div>
	</header>
	<div class="body">
		<Body />
	</div>
</div>

<style>
	.window {
		position: absolute;
		display: flex;
		flex-direction: column;
		padding: 0 7px 7px;
		border-radius: 8px;
		border: 1px solid rgba(0, 0, 0, 0.55);
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.08) 38px, rgba(255, 255, 255, 0.05)),
			rgba(80, 130, 180, 0.42);
		backdrop-filter: blur(12px) saturate(160%);
		-webkit-backdrop-filter: blur(12px) saturate(160%);
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.55),
			0 10px 34px rgba(0, 0, 0, 0.45);
		animation: open 160ms ease-out;
		min-width: 260px;
	}
	.window:not(.active) {
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05) 38px),
			rgba(150, 170, 190, 0.32);
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.4),
			0 6px 20px rgba(0, 0, 0, 0.3);
	}
	.window.maximized {
		left: 0 !important;
		top: 0 !important;
		width: 100% !important;
		height: 100% !important;
		border-radius: 0;
		padding: 0 0 0;
	}
	.window.minimized {
		display: none;
	}
	@keyframes open {
		from {
			opacity: 0;
			transform: scale(0.94) translateY(8px);
		}
	}

	.titlebar {
		display: flex;
		align-items: center;
		gap: 6px;
		height: 30px;
		padding-left: 4px;
		cursor: default;
		user-select: none;
		touch-action: none;
	}
	.title-icon {
		display: grid;
		filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
	}
	h2 {
		flex: 1;
		margin: 0;
		font-size: 12px;
		font-weight: 400;
		color: #000;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-shadow:
			0 0 10px #fff,
			0 0 10px #fff,
			0 0 6px #fff;
	}

	.caption {
		display: flex;
		align-self: flex-start;
		border: 1px solid rgba(0, 0, 0, 0.5);
		border-top: 0;
		border-radius: 0 0 5px 5px;
		overflow: hidden;
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.5),
			inset 0 0 0 1px rgba(255, 255, 255, 0.4);
	}
	.cap {
		display: grid;
		place-items: center;
		width: 27px;
		height: 19px;
		padding: 0;
		border: 0;
		border-right: 1px solid rgba(0, 0, 0, 0.35);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.15) 50%, rgba(160, 190, 220, 0.25) 51%, rgba(255, 255, 255, 0.3));
		cursor: pointer;
	}
	.cap svg {
		width: 10px;
		height: 10px;
		fill: #fff;
		stroke: #fff;
		stroke-width: 1.8;
		filter: drop-shadow(0 0 1px #000) drop-shadow(0 0 1px rgba(0, 0, 0, 0.6));
	}
	.cap.min svg,
	.cap.max svg {
		stroke: none;
	}
	.cap:hover {
		background: linear-gradient(180deg, #d4ecff, #6eb4f0 50%, #3d8fdd 51%, #8fd0ff);
	}
	.cap.close {
		width: 45px;
		border-right: 0;
		background: linear-gradient(180deg, #e8a493, #d0705a 50%, #b8432a 51%, #d26d4e);
	}
	.cap.close:hover {
		background: linear-gradient(180deg, #ffb7a6, #f25a3c 50%, #d8311a 51%, #ff7a50);
		box-shadow: 0 0 10px rgba(255, 90, 40, 0.8);
	}
	.window:not(.active) .cap.close {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.15) 50%, rgba(160, 190, 220, 0.25) 51%, rgba(255, 255, 255, 0.3));
	}
	.cap:focus-visible {
		outline: 1px dotted #000;
		outline-offset: -3px;
	}

	.body {
		flex: 1;
		min-height: 0;
		overflow: auto;
		background: #fff;
		border: 1px solid rgba(0, 0, 0, 0.45);
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.55);
		color: #1e1e1e;
		font-size: 13px;
	}
	.maximized .body {
		border-left: 0;
		border-right: 0;
		border-bottom: 0;
	}
</style>

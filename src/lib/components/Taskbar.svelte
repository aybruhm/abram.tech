<script lang="ts">
	import { onMount } from 'svelte';
	import { apps, appIds, type AppId } from '#lib/apps.ts';
	import { wm } from '#lib/wm.svelte.ts';
	import Icon from './Icon.svelte';
	import Orb from './Orb.svelte';

	let now = $state(new Date());
	onMount(() => {
		const t = setInterval(() => (now = new Date()), 10_000);
		return () => clearInterval(t);
	});

	const time = $derived(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
	const date = $derived(now.toLocaleDateString('en-GB'));

	// pinned apps first (in registry order), then any other open windows
	const buttons = $derived.by(() => {
		const pinned = appIds.filter((id) => apps[id].pinned);
		const extra = wm.windows.map((w) => w.id).filter((id) => !pinned.includes(id));
		return [...pinned, ...extra] as AppId[];
	});
</script>

<footer class="taskbar">
	<button
		class="orb"
		class:open={wm.startOpen}
		aria-label="Start"
		aria-expanded={wm.startOpen}
		onclick={(e) => {
			e.stopPropagation();
			wm.startOpen = !wm.startOpen;
		}}
	>
		<Orb />
	</button>

	<nav class="tasks" aria-label="Open windows">
		{#each buttons as id (id)}
			{@const win = wm.windows.find((w) => w.id === id)}
			<button
				class="task"
				class:running={!!win}
				class:active={wm.activeId === id && !win?.minimized}
				title={apps[id].title}
				aria-label={apps[id].title}
				onclick={() => wm.taskbarClick(id)}
			>
				<Icon name={apps[id].icon} size={26} />
			</button>
		{/each}
	</nav>

	<div class="tray">
		<time class="clock" datetime={now.toISOString()}>
			<span>{time}</span>
			<span>{date}</span>
		</time>
		<button class="peek" aria-label="Show desktop" title="Show desktop" onclick={() => wm.windows.forEach((w) => wm.minimize(w.id))}></button>
	</div>
</footer>

<style>
	.taskbar {
		position: fixed;
		inset: auto 0 0 0;
		height: var(--taskbar-h);
		display: flex;
		align-items: stretch;
		z-index: 100000;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.06) 45%, rgba(0, 0, 0, 0.12) 55%, rgba(0, 0, 0, 0.05)),
			rgba(20, 45, 75, 0.62);
		backdrop-filter: blur(14px) saturate(150%);
		-webkit-backdrop-filter: blur(14px) saturate(150%);
		border-top: 1px solid rgba(0, 0, 0, 0.6);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
	}

	.orb {
		width: 54px;
		display: grid;
		place-items: center;
		padding: 0;
		margin-top: -6px;
		background: none;
		border: 0;
		cursor: pointer;
		filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.6));
		transition: filter 150ms;
	}
	.orb:hover,
	.orb.open {
		filter: drop-shadow(0 0 8px rgba(120, 220, 255, 0.95)) brightness(1.15);
	}

	.tasks {
		flex: 1;
		display: flex;
		gap: 2px;
		padding: 2px 4px;
		overflow-x: auto;
		scrollbar-width: none;
	}
	.task {
		position: relative;
		width: 60px;
		flex: none;
		display: grid;
		place-items: center;
		padding: 0;
		border: 1px solid transparent;
		border-radius: 3px;
		background: none;
		cursor: pointer;
	}
	.task.running {
		border-color: rgba(0, 0, 0, 0.55);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 51%, rgba(255, 255, 255, 0.12));
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
	}
	.task.active {
		background:
			radial-gradient(ellipse at 50% 100%, rgba(140, 220, 255, 0.55), transparent 70%),
			linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.06) 51%, rgba(255, 255, 255, 0.22));
	}
	.task:hover {
		background:
			radial-gradient(ellipse at 50% 100%, rgba(140, 220, 255, 0.7), transparent 75%),
			linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.08));
		border-color: rgba(0, 0, 0, 0.55);
	}

	.tray {
		display: flex;
		align-items: stretch;
		border-left: 1px solid rgba(0, 0, 0, 0.35);
		box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.15);
	}
	.clock {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 12px;
		color: #fff;
		font-size: 11.5px;
		line-height: 1.35;
		text-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
	}
	.peek {
		width: 14px;
		padding: 0;
		border: 0;
		border-left: 1px solid rgba(0, 0, 0, 0.45);
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03));
		box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.25);
		cursor: pointer;
	}
	.peek:hover {
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
	}
	button:focus-visible {
		outline: 1px dotted #fff;
		outline-offset: -3px;
	}

	@media (max-width: 720px) {
		.task {
			width: 46px;
		}
		.clock span:last-child {
			display: none;
		}
	}
</style>

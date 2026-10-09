<script lang="ts">
	import { apps, appIds, labels, type AppId } from '#lib/apps.ts';
	import { wm } from '#lib/wm.svelte.ts';
	import Icon from './Icon.svelte';

	let selected = $state<AppId | null>(null);

	const desktop = appIds.filter((id) => apps[id].desktop);

	// Touch: one tap opens. Mouse: click selects, double-click opens (desktop convention).
	function onClick(e: MouseEvent, id: AppId) {
		e.stopPropagation();
		selected = id;
		const coarse = (e as PointerEvent).pointerType === 'touch' || matchMedia('(pointer: coarse)').matches;
		if (coarse) wm.open(id);
	}
</script>

<svelte:window onclick={() => (selected = null)} />

<ul class="icons" aria-label="Desktop">
	{#each desktop as id (id)}
		<li>
			<button
				class="icon"
				class:selected={selected === id}
				onclick={(e) => onClick(e, id)}
				ondblclick={() => wm.open(id)}
				onkeydown={(e) => e.key === 'Enter' && wm.open(id)}
			>
				<Icon name={apps[id].icon} size={48} />
				<span>{labels[id]}</span>
			</button>
		</li>
	{/each}
</ul>

<style>
	.icons {
		position: absolute;
		inset: 8px auto calc(var(--taskbar-h) + 8px) 8px;
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-auto-flow: column;
		grid-template-rows: repeat(auto-fill, 96px);
		grid-auto-columns: 84px;
		gap: 4px;
	}
	.icon {
		width: 80px;
		height: 92px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 6px 2px;
		border: 1px solid transparent;
		border-radius: 3px;
		background: none;
		cursor: default;
		color: #fff;
		font: inherit;
		font-size: 12px;
		line-height: 1.2;
		text-align: center;
		text-shadow:
			0 1px 2px rgba(0, 0, 0, 0.95),
			0 0 4px rgba(0, 0, 0, 0.7);
	}
	.icon :global(svg) {
		filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.5));
	}
	.icon:hover {
		border-color: rgba(255, 255, 255, 0.35);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.08));
	}
	.icon.selected,
	.icon:focus-visible {
		outline: none;
		border-color: rgba(255, 255, 255, 0.6);
		background: linear-gradient(180deg, rgba(150, 200, 255, 0.5), rgba(90, 150, 230, 0.35));
	}

	@media (max-width: 720px) {
		.icons {
			inset: 12px 12px auto 12px;
			grid-auto-flow: row;
			grid-template-rows: none;
			grid-template-columns: repeat(auto-fill, 84px);
			justify-content: center;
		}
	}
</style>

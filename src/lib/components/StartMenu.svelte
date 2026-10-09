<script lang="ts">
	import { apps, appIds, labels, type AppId } from '#lib/apps.ts';
	import { profile } from '#lib/content.ts';
	import { wm } from '#lib/wm.svelte.ts';
	import Icon from './Icon.svelte';

	let { onShutdown }: { onShutdown: () => void } = $props();

	let query = $state('');
	let hover = $state<AppId | null>(null);

	const results = $derived(
		query.trim()
			? appIds.filter((id) => `${labels[id]} ${apps[id].title}`.toLowerCase().includes(query.trim().toLowerCase()))
			: appIds
	);

	const right: { id: AppId; label: string }[] = [
		{ id: 'about', label: profile.name },
		{ id: 'projects', label: 'Projects' },
		// { id: 'experience', label: 'Experience' }, // EXPERIENCE
		{ id: 'skills', label: 'Skills' },
		{ id: 'contact', label: 'Contact' },
		{ id: 'readme', label: 'readme.txt' }
	];

	function launch(id: AppId) {
		query = '';
		wm.open(id);
	}

	function autofocus(node: HTMLInputElement) {
		if (!wm.compact) node.focus();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="start" role="menu" tabindex="-1" onclick={(e) => e.stopPropagation()}>
	<div class="left">
		<ul>
			{#each results as id (id)}
				<li>
					<button class="item" role="menuitem" onclick={() => launch(id)} onmouseenter={() => (hover = id)}>
						<Icon name={apps[id].icon} size={32} />
						<span>{labels[id]}</span>
					</button>
				</li>
			{:else}
				<li class="empty">No programs match "{query}".</li>
			{/each}
		</ul>
		<form
			class="search"
			onsubmit={(e) => {
				e.preventDefault();
				if (results[0]) launch(results[0]);
			}}
		>
			<input
				type="search"
				placeholder="Search programs and files"
				aria-label="Search programs"
				bind:value={query}
				use:autofocus
			/>
		</form>
	</div>

	<div class="right">
		<div class="avatar">
			<Icon name={hover ? apps[hover].icon : 'user'} size={48} />
		</div>
		<ul>
			{#each right as r}
				<li>
					<button class="link" role="menuitem" onclick={() => launch(r.id)} onmouseenter={() => (hover = r.id)}>
						{r.label}
					</button>
				</li>
			{/each}
			<li class="sep"></li>
			<li>
				<button class="link" role="menuitem" onclick={() => launch('cmd')} onmouseenter={() => (hover = 'cmd')}>
					Command Prompt
				</button>
			</li>
		</ul>
		<button class="shutdown" onclick={onShutdown}>Shut down</button>
	</div>
</div>

<style>
	.start {
		position: fixed;
		left: 0;
		bottom: var(--taskbar-h);
		z-index: 100001;
		width: min(400px, 100vw);
		display: grid;
		grid-template-columns: 1fr 150px;
		gap: 6px;
		padding: 8px;
		border-radius: 8px 8px 0 0;
		border: 1px solid rgba(0, 0, 0, 0.65);
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.06) 60px),
			rgba(22, 50, 84, 0.9);
		backdrop-filter: blur(16px) saturate(160%);
		-webkit-backdrop-filter: blur(16px) saturate(160%);
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.45),
			0 -6px 30px rgba(0, 0, 0, 0.45);
		animation: rise 140ms ease-out;
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
	}

	.left {
		display: flex;
		flex-direction: column;
		min-height: 380px;
		background: #fff;
		border: 1px solid rgba(0, 0, 0, 0.55);
		border-radius: 4px;
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5);
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 4px;
	}
	.left ul {
		flex: 1;
	}
	.item {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 4px 6px;
		border: 1px solid transparent;
		border-radius: 3px;
		background: none;
		font: inherit;
		font-size: 13px;
		color: #1e1e1e;
		text-align: left;
		cursor: pointer;
	}
	.item:hover,
	.item:focus-visible {
		outline: none;
		border-color: #7da2ce;
		background: linear-gradient(180deg, #f2f8fe, #d9ebfc);
	}
	.empty {
		padding: 10px;
		color: #6d6d6d;
		font-size: 12px;
	}
	.search {
		padding: 6px;
		border-top: 1px solid #d5dfe9;
		background: linear-gradient(180deg, #f3f7fb, #dfe9f3);
		border-radius: 0 0 3px 3px;
	}
	.search input {
		width: 100%;
		padding: 4px 8px;
		font: inherit;
		font-size: 12px;
		font-style: italic;
		border: 1px solid #8ea4c1;
		border-radius: 2px;
	}
	.search input:focus {
		outline: none;
		font-style: normal;
		border-color: #3d7bad;
	}

	.right {
		display: flex;
		flex-direction: column;
		color: #fff;
	}
	.avatar {
		align-self: center;
		margin: -26px 0 6px;
		padding: 5px;
		border-radius: 6px;
		border: 1px solid rgba(0, 0, 0, 0.5);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(200, 220, 240, 0.7));
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
		display: grid;
	}
	.right ul {
		flex: 1;
		padding: 0;
	}
	.link {
		width: 100%;
		padding: 6px 10px;
		border: 1px solid transparent;
		border-radius: 3px;
		background: none;
		color: #fff;
		font: inherit;
		font-size: 13px;
		text-align: left;
		text-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
		cursor: pointer;
	}
	.link:hover,
	.link:focus-visible {
		outline: none;
		border-color: rgba(0, 0, 0, 0.5);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 51%, rgba(255, 255, 255, 0.2));
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
	}
	.sep {
		height: 1px;
		margin: 6px 8px;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
	}
	.shutdown {
		align-self: flex-end;
		margin-top: 8px;
		padding: 5px 14px;
		border: 1px solid rgba(0, 0, 0, 0.6);
		border-radius: 3px;
		color: #fff;
		font: inherit;
		font-size: 12px;
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
		background: linear-gradient(180deg, #e19a85, #c4593d 50%, #a63719 51%, #c8613f);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
		cursor: pointer;
	}
	.shutdown:hover {
		background: linear-gradient(180deg, #ffb39c, #e66a49 50%, #c9401c 51%, #f07a50);
	}

	@media (max-width: 480px) {
		.start {
			grid-template-columns: 1fr;
		}
		.right {
			display: none;
		}
	}
</style>

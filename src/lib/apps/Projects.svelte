<script lang="ts">
	import { projects, type Project } from '#lib/content.ts';
	import Icon from '#lib/components/Icon.svelte';

	let view = $state<'tiles' | 'details'>('tiles');
	// track by name: $state would proxy the object and break identity checks
	let selectedName = $state(projects[0].name);
	const selected: Project = $derived(projects.find((p) => p.name === selectedName) ?? projects[0]);
</script>

<div class="wrap">
	<div class="toolbar">
		<span class="crumb">Computer › Abram › Projects</span>
		<div class="views" role="group" aria-label="View">
			<button class="btn" aria-pressed={view === 'tiles'} onclick={() => (view = 'tiles')}>Tiles</button>
			<button class="btn" aria-pressed={view === 'details'} onclick={() => (view = 'details')}>Details</button>
		</div>
	</div>

	<div class="files" class:details={view === 'details'}>
		{#if view === 'details'}
			<div class="head" aria-hidden="true">
				<span>Name</span><span>Status</span><span>Stack</span>
			</div>
		{/if}
		{#each projects as p (p.name)}
			<button class="file" class:selected={selectedName === p.name} onclick={() => (selectedName = p.name)} aria-pressed={selectedName === p.name}>
				<Icon name={p.status === 'Live' ? 'globe' : 'folder'} size={view === 'tiles' ? 48 : 16} />
				<span class="fname">
					<strong>{p.name}</strong>
					{#if view === 'tiles'}<small>{p.tagline}</small>{/if}
				</span>
				{#if view === 'details'}
					<span>{p.status}</span>
					<span class="stack">{p.stack.join(', ')}</span>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Details pane, as in Explorer -->
	<footer class="pane">
		<Icon name={selected.status === 'Live' ? 'globe' : 'folder'} size={48} />
		<div class="meta">
			<h3>{selected.name} <span class="tag">{selected.status}</span></h3>
			<p class="tagline">{selected.tagline}</p>
			{#each selected.details as d}
				<p>{d}</p>
			{/each}
			<p class="tags">
				{#each selected.stack as s}<span class="tag">{s}</span>{/each}
				{#if selected.href}
					<a class="btn" href={selected.href} target="_blank" rel="noopener noreferrer">Open</a>
				{/if}
			</p>
		</div>
	</footer>
</div>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.views {
		display: flex;
		gap: 4px;
	}
	.views .btn[aria-pressed='true'] {
		border-color: #3c7fb1;
		background: linear-gradient(180deg, #e5f4fc, #c4e5f6 50%, #98d1ef 51%, #b6e0f5);
	}
	.files {
		flex: 1;
		overflow: auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
		align-content: start;
		gap: 4px;
		padding: 10px;
	}
	.files.details {
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 0;
	}
	.head,
	.details .file {
		display: grid;
		grid-template-columns: 1.3fr 0.6fr 1.6fr;
		gap: 10px;
		align-items: center;
	}
	.head {
		padding: 4px 10px 4px 34px;
		border-bottom: 1px solid #e3e9f0;
		color: #4c607a;
		font-size: 12px;
	}
	.file {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 6px 8px;
		border: 1px solid transparent;
		border-radius: 3px;
		background: none;
		color: #1e1e1e;
		font-size: 12.5px;
		text-align: left;
		cursor: default;
	}
	.details .file {
		grid-template-columns: 16px 1.3fr 0.6fr 1.6fr;
		padding: 3px 10px;
		border-radius: 0;
	}
	.fname {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}
	.fname strong {
		font-weight: 400;
	}
	.fname small {
		color: var(--muted);
		font-size: 11.5px;
	}
	.stack {
		color: var(--muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.file:hover {
		border-color: #b8d6fb;
		background: linear-gradient(180deg, #fafbfd, #ebf3fd);
	}
	.file.selected {
		border-color: #84acdd;
		background: linear-gradient(180deg, #dcebfc, #c1dbfc);
	}
	.file:focus-visible {
		outline: 1px dotted #000;
		outline-offset: -3px;
	}
	.pane {
		display: flex;
		gap: 14px;
		padding: 12px 16px;
		max-height: 45%;
		overflow: auto;
		border-top: 1px solid #b9cbe0;
		background: linear-gradient(180deg, #f1f6fb, #dde8f4);
	}
	.meta h3 {
		margin: 0;
		font-size: 15px;
		font-weight: 400;
		color: #1e395b;
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.meta p {
		margin: 4px 0;
		line-height: 1.5;
		max-width: 70ch;
	}
	.tagline {
		color: var(--muted);
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		align-items: center;
	}
</style>

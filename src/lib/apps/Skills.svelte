<script lang="ts">
	import { skills, type Skill } from '#lib/content.ts';
	import Icon from '#lib/components/Icon.svelte';

	type Key = keyof Skill;
	let sortKey = $state<Key>('group');
	let asc = $state(true);
	let filter = $state('');

	const rows = $derived(
		skills
			.filter((s) => `${s.name} ${s.group} ${s.usedFor}`.toLowerCase().includes(filter.toLowerCase()))
			.toSorted((a, b) => {
				const c = a[sortKey].localeCompare(b[sortKey]) || a.name.localeCompare(b.name);
				return asc ? c : -c;
			})
	);

	function sortBy(k: Key) {
		if (sortKey === k) asc = !asc;
		else {
			sortKey = k;
			asc = true;
		}
	}

	const cols: { key: Key; label: string }[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'group', label: 'Category' },
		{ key: 'usedFor', label: 'Used for' }
	];
</script>

<div class="wrap">
	<div class="toolbar">
		<span class="crumb">Control Panel › Programs › Programs and Features</span>
		<input type="search" placeholder="Search skills" aria-label="Search skills" bind:value={filter} />
	</div>
	<div class="intro">
		<h1>Uninstall or change a skill</h1>
		<p>None of these can be uninstalled. Click a column heading to sort.</p>
	</div>
	<div class="grid">
		<table>
			<thead>
				<tr>
					{#each cols as c}
						<th aria-sort={sortKey === c.key ? (asc ? 'ascending' : 'descending') : 'none'}>
							<button onclick={() => sortBy(c.key)}>
								{c.label}
								{#if sortKey === c.key}<span class="arrow">{asc ? '▲' : '▼'}</span>{/if}
							</button>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each rows as s (s.name)}
					<tr>
						<td class="name"><Icon name="gear" size={16} /> {s.name}</td>
						<td>{s.group}</td>
						<td class="muted">{s.usedFor}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<footer>{rows.length} skills installed</footer>
</div>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.toolbar input {
		width: 170px;
		padding: 3px 8px;
		border: 1px solid #a7bcd6;
		border-radius: 2px;
		font: inherit;
		font-size: 12px;
		font-style: italic;
	}
	.intro {
		padding: 12px 16px 6px;
	}
	h1 {
		margin: 0 0 4px;
		font-size: 15px;
		font-weight: 400;
		color: #1e395b;
	}
	.intro p {
		margin: 0;
		color: var(--muted);
		font-size: 12px;
	}
	.grid {
		flex: 1;
		overflow: auto;
		padding: 0 16px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 12.5px;
	}
	thead th {
		position: sticky;
		top: 0;
		padding: 0;
		background: linear-gradient(180deg, #fff, #f3f6fa);
		border-bottom: 1px solid #d5dfe9;
		border-right: 1px solid #e3e9f0;
		text-align: left;
	}
	thead button {
		width: 100%;
		padding: 5px 8px;
		border: 0;
		background: none;
		color: #4c607a;
		font-size: 12px;
		text-align: left;
		cursor: pointer;
	}
	thead button:hover {
		background: linear-gradient(180deg, #f3f9fe, #dcecfc);
	}
	.arrow {
		font-size: 8px;
		margin-left: 4px;
	}
	td {
		padding: 4px 8px;
		border-bottom: 1px solid #f0f3f7;
	}
	tbody tr:hover {
		background: linear-gradient(180deg, #fafbfd, #ebf3fd);
	}
	.name {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.muted {
		color: var(--muted);
	}
	footer {
		padding: 6px 16px;
		border-top: 1px solid #b9cbe0;
		background: linear-gradient(180deg, #f1f6fb, #dde8f4);
		color: #1e395b;
		font-size: 12px;
	}
</style>

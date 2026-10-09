<script lang="ts">
	import { experience, openSource } from '#lib/content.ts';
	import Icon from '#lib/components/Icon.svelte';
</script>

<div class="toolbar">
	<span class="crumb">Libraries › Documents › Experience</span>
</div>

<div class="doc">
	<ol class="timeline">
		{#each experience as r (r.company)}
			<li>
				<span class="dot" aria-hidden="true"></span>
				<div class="entry">
					<header>
						<h3>{r.company}</h3>
						{#if r.period}<span class="period">{r.period}</span>{/if}
					</header>
					{#if r.role}<p class="role">{r.role}</p>{/if}
					<p class="summary">{r.summary}</p>
					{#if r.points.length}
						<ul>
							{#each r.points as pt}<li>{pt}</li>{/each}
						</ul>
					{/if}
				</div>
			</li>
		{/each}
	</ol>

	<h2><Icon name="doc" size={20} /> Open-source contributions</h2>
	<table>
		<tbody>
			{#each openSource as o}
				<tr>
					<th scope="row">{o.project}</th>
					<td>{o.note}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.doc {
		padding: 18px 22px 24px;
	}
	.timeline {
		list-style: none;
		margin: 0;
		padding: 0;
		position: relative;
	}
	.timeline::before {
		content: '';
		position: absolute;
		left: 6px;
		top: 8px;
		bottom: 8px;
		width: 2px;
		background: linear-gradient(180deg, #4a90d9, #b7cbe2);
	}
	.timeline > li {
		position: relative;
		padding: 0 0 16px 28px;
	}
	.dot {
		position: absolute;
		left: 0;
		top: 4px;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: 1px solid #1d4f8a;
		background: radial-gradient(circle at 50% 35%, #bfe6ff, #2b78c9 70%);
		box-shadow: 0 0 0 3px #fff;
	}
	header {
		display: flex;
		align-items: baseline;
		gap: 10px;
		flex-wrap: wrap;
	}
	h3 {
		margin: 0;
		font-size: 15px;
		font-weight: 400;
		color: #1e395b;
	}
	.period {
		color: var(--muted);
		font-size: 12px;
	}
	.role {
		margin: 2px 0 0;
		color: #2a6ebb;
	}
	.summary {
		margin: 2px 0 4px;
		color: var(--muted);
	}
	ul {
		margin: 4px 0 0;
		padding-left: 18px;
		line-height: 1.55;
	}
	h2 {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 10px 0 8px;
		font-size: 13px;
		font-weight: 400;
		color: #1e395b;
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		padding: 6px 8px;
		border-bottom: 1px solid #e3e9f0;
		text-align: left;
		vertical-align: top;
	}
	th {
		width: 30%;
		font-weight: 600;
		color: #1e395b;
	}
</style>

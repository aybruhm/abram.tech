<script lang="ts">
	import { profile } from '#lib/content.ts';

	let subject = $state('Hello from abram.tech');
	let body = $state('');

	const mailto = $derived(
		`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
	);
	const links = profile.links.filter((l) => l.href);
</script>

<div class="wrap">
	<div class="toolbar">
		<a class="btn send" href={mailto}>Send</a>
		<span class="hint">Opens your mail app. Nothing is sent from this page.</span>
	</div>

	<div class="fields">
		<label>
			<span>To:</span>
			<input value={profile.email} readonly />
		</label>
		<label>
			<span>Subject:</span>
			<input bind:value={subject} />
		</label>
	</div>

	<textarea bind:value={body} placeholder="Write your message..." aria-label="Message"></textarea>

	{#if links.length}
		<footer>
			{#each links as l}
				<a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
			{/each}
		</footer>
	{/if}
</div>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.send {
		font-weight: 600;
	}
	.hint {
		color: var(--muted);
		font-size: 11.5px;
	}
	.fields {
		display: grid;
		gap: 6px;
		padding: 10px 12px;
		border-bottom: 1px solid #d5dfe9;
		background: #f7f9fc;
	}
	label {
		display: grid;
		grid-template-columns: 62px 1fr;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: #1e395b;
	}
	input {
		padding: 3px 6px;
		border: 1px solid #a7bcd6;
		border-radius: 2px;
		font: inherit;
		font-size: 12.5px;
	}
	input[readonly] {
		background: #eef3f8;
	}
	textarea {
		flex: 1;
		margin: 0;
		padding: 10px 12px;
		border: 0;
		resize: none;
		font: inherit;
		font-size: 13px;
		line-height: 1.5;
	}
	textarea:focus,
	input:focus {
		outline: none;
	}
	input:focus {
		border-color: #3d7bad;
	}
	footer {
		display: flex;
		gap: 16px;
		padding: 8px 12px;
		border-top: 1px solid #b9cbe0;
		background: linear-gradient(180deg, #f1f6fb, #dde8f4);
		font-size: 12px;
	}
</style>

<script lang="ts">
	import { profile, projects, skills } from '#lib/content.ts';
	import { wm } from '#lib/wm.svelte.ts';
	import Icon from '#lib/components/Icon.svelte';

	const rows: [string, string][] = [
		['Role', `${profile.current.role}, ${profile.current.company}`],
		['Focus', profile.current.focus],
		['Location', profile.location],
		['Projects', `${projects.length} (${projects.filter((p) => p.status === 'Active').length} active)`],
		['Installed skills', `${skills.length}`]
	];
</script>

<div class="toolbar">
	<span class="crumb">Control Panel › People › {profile.name}</span>
</div>

<div class="page">
	<aside>
		<h3>Control Panel Home</h3>
		<button class="link" onclick={() => wm.open('projects')}>Projects</button>
		<!-- EXPERIENCE: <button class="link" onclick={() => wm.open('experience')}>Experience</button> -->
		<button class="link" onclick={() => wm.open('skills')}>Skills</button>
		<button class="link" onclick={() => wm.open('contact')}>Contact</button>
		<div class="see">
			<h4>See also</h4>
			<button class="link" onclick={() => wm.open('readme')}>readme.txt</button>
			<button class="link" onclick={() => wm.open('cmd')}>Command Prompt</button>
		</div>
	</aside>

	<article>
		<h1>View basic information about {profile.name}</h1>

		<section class="hero">
			<div class="badge"><Icon name="user" size={72} /></div>
			<div>
				<p class="name">{profile.name}</p>
				<p class="headline">{profile.headline}</p>
				<p class="sub">{profile.subhead}</p>
			</div>
		</section>

		<h2>Summary</h2>
		{#each profile.summary as para}
			<p>{para}</p>
		{/each}

		<h2>System</h2>
		<dl>
			{#each rows as [k, v]}
				<dt>{k}:</dt>
				<dd>{v}</dd>
			{/each}
		</dl>
	</article>
</div>

<style>
	.page {
		display: grid;
		grid-template-columns: 170px 1fr;
		min-height: calc(100% - 33px);
	}
	aside {
		padding: 14px 12px;
		background: linear-gradient(180deg, #eef4fb, #dae6f3);
		border-right: 1px solid #c3d4e7;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	aside h3,
	aside h4 {
		margin: 0 0 4px;
		font-size: 12px;
		font-weight: 600;
		color: #1e395b;
	}
	.see {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding-top: 12px;
	}
	.link {
		padding: 0;
		border: 0;
		background: none;
		color: var(--link);
		font-size: 12px;
		text-align: left;
		cursor: pointer;
	}
	.link:hover {
		text-decoration: underline;
		color: #3399ff;
	}
	article {
		padding: 16px 22px 22px;
	}
	h1 {
		margin: 0 0 14px;
		font-size: 15px;
		font-weight: 400;
		color: #1e395b;
	}
	h2 {
		margin: 18px 0 8px;
		font-size: 13px;
		font-weight: 400;
		color: #1e395b;
		display: flex;
		align-items: center;
		gap: 8px;
	}
	h2::after {
		content: '';
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, #b7cbe2, transparent);
	}
	.hero {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.badge {
		padding: 6px;
		border: 1px solid #b7cbe2;
		border-radius: 6px;
		background: linear-gradient(180deg, #fff, #eaf2fb);
		box-shadow: 0 1px 4px rgba(30, 57, 91, 0.2);
		display: grid;
	}
	.name {
		margin: 0;
		font-size: 24px;
		font-weight: 300;
		color: #1e395b;
	}
	.headline {
		margin: 2px 0 0;
		font-size: 14px;
		color: #2a6ebb;
	}
	.sub {
		margin: 2px 0 0;
		color: var(--muted);
	}
	p {
		line-height: 1.55;
		margin: 0 0 8px;
		max-width: 60ch;
	}
	dl {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: 6px 18px;
		margin: 0;
	}
	dt {
		color: var(--muted);
	}
	dd {
		margin: 0;
	}
	@media (max-width: 720px) {
		.page {
			grid-template-columns: 1fr;
			grid-template-rows: auto 1fr;
		}
		aside {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 10px 14px;
			border-right: 0;
			border-bottom: 1px solid #c3d4e7;
		}
		aside h3,
		.see {
			display: none;
		}
	}
</style>

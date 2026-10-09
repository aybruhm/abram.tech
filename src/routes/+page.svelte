<script lang="ts">
	import { onMount } from 'svelte';
	import { isAppId } from '#lib/apps.ts';
	import { profile, projects } from '#lib/content.ts';
	import { wm } from '#lib/wm.svelte.ts';
	import Wallpaper from '#lib/components/Wallpaper.svelte';
	import DesktopIcons from '#lib/components/DesktopIcons.svelte';
	import Window from '#lib/components/Window.svelte';
	import Taskbar from '#lib/components/Taskbar.svelte';
	import StartMenu from '#lib/components/StartMenu.svelte';
	import Power from '#lib/components/Power.svelte';

	let power = $state<'boot' | 'shutting' | 'off' | null>(null);

	function firstWindow() {
		const hash = location.hash.slice(1);
		wm.open(isAppId(hash) ? hash : 'about');
	}

	onMount(() => {
		// Boot splash once per browser session; skipped when deep-linking (#projects etc.)
		let seen = false;
		try {
			seen = sessionStorage.getItem('booted') === '1';
			sessionStorage.setItem('booted', '1');
		} catch {
			/* storage blocked: just skip the splash */
			seen = true;
		}
		if (!seen && !location.hash) power = 'boot';
		else firstWindow();
	});

	function powerDone() {
		if (power === 'boot') {
			power = null;
			firstWindow();
		} else if (power === 'shutting') {
			wm.closeAll();
			power = 'off';
		} else if (power === 'off') {
			power = 'boot';
		}
	}

	const title = `${profile.name} · ${profile.headline}`;
	const description = `${profile.name}: ${profile.headline.toLowerCase()} in ${profile.location}. ${profile.summary[0]}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://abram.tech" />
</svelte:head>

<svelte:window
	onclick={() => (wm.startOpen = false)}
	onkeydown={(e) => {
		if (e.key !== 'Escape') return;
		wm.startOpen = e.ctrlKey ? !wm.startOpen : false;
	}}
/>

<!-- Plain-text summary for crawlers and screen readers; the desktop is the visual layer. -->
<div class="sr-only">
	<h1>{profile.name}, {profile.headline}</h1>
	<p>{profile.current.role} at {profile.current.company}. {profile.location}.</p>
	{#each profile.summary as p}<p>{p}</p>{/each}
	<h2>Projects</h2>
	<ul>
		{#each projects as p}<li>{p.name}: {p.tagline}</li>{/each}
	</ul>
	<p>Contact: {profile.email}</p>
</div>

<main class="desktop">
	<Wallpaper />
	<DesktopIcons />
	{#each wm.windows as win (win.id)}
		<Window {win} />
	{/each}
</main>

{#if wm.startOpen}
	<StartMenu onShutdown={() => (power = 'shutting')} />
{/if}

<Taskbar />

{#if power}
	<Power mode={power} ondone={powerDone} />
{/if}

<style>
	.desktop {
		position: fixed;
		inset: 0 0 var(--taskbar-h) 0;
		overflow: hidden;
	}
</style>

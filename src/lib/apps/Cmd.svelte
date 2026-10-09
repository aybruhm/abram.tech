<script lang="ts">
	import { tick } from 'svelte';
	import { appIds, isAppId, labels } from '#lib/apps.ts';
	import { profile, projects, skills, experience } from '#lib/content.ts';
	import { wm } from '#lib/wm.svelte.ts';

	const PROMPT = 'C:\\Users\\abram>';

	let lines = $state<string[]>([
		'abram.tech Command Prompt [Version 1.0]',
		'Type "help" for a list of commands.',
		''
	]);
	let input = $state('');
	let history: string[] = [];
	let cursor = -1;
	let screen: HTMLDivElement;
	let field: HTMLInputElement;

	/** Add a command: name -> function returning lines to print. */
	const commands: Record<string, { help: string; run: (args: string[]) => string[] }> = {
		help: {
			help: 'List commands',
			run: () => Object.entries(commands).map(([k, c]) => `  ${k.padEnd(12)}${c.help}`)
		},
		whoami: {
			help: 'Who runs this machine',
			run: () => [`${profile.name}, ${profile.headline}`, `${profile.current.role} at ${profile.current.company}`, profile.location]
		},
		about: { help: 'Summary', run: () => profile.summary },
		projects: {
			help: 'List projects',
			run: () => projects.map((p) => `  ${p.name.padEnd(12)}[${p.status}] ${p.tagline}`)
		},
		experience: {
			help: 'Work history',
			run: () => experience.map((r) => `  ${r.company}${r.role ? ` (${r.role})` : ''}: ${r.summary}`)
		},
		skills: {
			help: 'List skills by category',
			run: () => {
				const groups = Map.groupBy(skills, (s) => s.group);
				return [...groups].map(([g, list]) => `  ${g.padEnd(16)}${list.map((s) => s.name).join(', ')}`);
			}
		},
		contact: { help: 'Email address', run: () => [`  ${profile.email}`] },
		dir: {
			help: 'List programs on this desktop',
			run: () => appIds.map((id) => `  ${id.padEnd(12)}${labels[id]}`)
		},
		open: {
			help: 'open <program>  e.g. open projects',
			run: ([id]) => {
				if (!id) return ['Usage: open <program>. Type "dir" for names.'];
				if (!isAppId(id)) return [`'${id}' is not a program. Type "dir" for names.`];
				wm.open(id);
				return [`Opening ${labels[id]}...`];
			}
		},
		date: { help: 'Current date and time', run: () => [new Date().toLocaleString('en-GB')] },
		echo: { help: 'Print text', run: (a) => [a.join(' ')] },
		ver: { help: 'Version', run: () => ['abram.tech [Version 1.0], SvelteKit on Debian (hadal)'] },
		cls: { help: 'Clear the screen', run: () => ((lines = []), []) },
		exit: { help: 'Close this window', run: () => (wm.close('cmd'), []) }
	};
	const aliases: Record<string, string> = { ls: 'dir', clear: 'cls', start: 'open', '?': 'help' };

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		const raw = input.trim();
		input = '';
		lines.push(`${PROMPT}${raw}`);
		if (raw) {
			history.unshift(raw);
			cursor = -1;
			const [name, ...args] = raw.split(/\s+/);
			const key = aliases[name.toLowerCase()] ?? name.toLowerCase();
			if (key === 'sudo') lines.push('Access is denied. Nice try.');
			else if (commands[key]) lines.push(...commands[key].run(args));
			else lines.push(`'${name}' is not recognized as a command. Type "help".`);
		}
		lines.push('');
		await tick();
		screen?.scrollTo({ top: screen.scrollHeight });
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'ArrowUp' && cursor < history.length - 1) input = history[++cursor];
		else if (e.key === 'ArrowDown') input = cursor > 0 ? history[--cursor] : ((cursor = -1), '');
		else return;
		e.preventDefault();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="cmd" bind:this={screen} onclick={() => field?.focus()}>
	{#each lines as line, i (i)}
		<pre>{line || ' '}</pre>
	{/each}
	<form onsubmit={submit}>
		<label for="cmd-in">{PROMPT}</label>
		<input
			id="cmd-in"
			bind:this={field}
			bind:value={input}
			onkeydown={onKey}
			autocomplete="off"
			autocapitalize="off"
			spellcheck="false"
		/>
	</form>
</div>

<style>
	.cmd {
		height: 100%;
		overflow: auto;
		padding: 6px 8px;
		background: #0c0c0c;
		color: #cccccc;
		font-family: var(--font-mono);
		font-size: 14px;
		line-height: 1.35;
		cursor: text;
	}
	pre {
		margin: 0;
		font: inherit;
		white-space: pre-wrap;
		word-break: break-word;
	}
	form {
		display: flex;
	}
	label {
		white-space: pre;
	}
	input {
		flex: 1;
		min-width: 0;
		padding: 0;
		border: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		caret-color: #cccccc;
		outline: none;
	}
</style>

<script module lang="ts">
	export type IconName =
		| 'user'
		| 'folder'
		| 'briefcase'
		| 'gear'
		| 'mail'
		| 'terminal'
		| 'notepad'
		| 'globe'
		| 'power'
		| 'doc';
</script>

<script lang="ts">
	let { name, size = 48 }: { name: IconName; size?: number } = $props();
	// unique gradient ids per instance so repeated icons never collide
	const uid = $props.id();
	const g = (k: string) => `${uid}-${k}`;
</script>

<svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
	<defs>
		<linearGradient id={g('gloss')} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#fff" stop-opacity=".75" />
			<stop offset=".5" stop-color="#fff" stop-opacity=".12" />
			<stop offset="1" stop-color="#fff" stop-opacity="0" />
		</linearGradient>
		<linearGradient id={g('blue')} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#7cc8ff" />
			<stop offset="1" stop-color="#1557b0" />
		</linearGradient>
		<linearGradient id={g('amber')} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#ffe7a1" />
			<stop offset=".55" stop-color="#f5bf45" />
			<stop offset="1" stop-color="#c98a14" />
		</linearGradient>
		<linearGradient id={g('brown')} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#b88655" />
			<stop offset="1" stop-color="#6b4220" />
		</linearGradient>
		<linearGradient id={g('steel')} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#eef3f8" />
			<stop offset="1" stop-color="#8d9aaa" />
		</linearGradient>
		<linearGradient id={g('paper')} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#ffffff" />
			<stop offset="1" stop-color="#dfe7f0" />
		</linearGradient>
		<radialGradient id={g('green')} cx="50%" cy="35%" r="70%">
			<stop offset="0" stop-color="#bff7a8" />
			<stop offset=".5" stop-color="#3fae2a" />
			<stop offset="1" stop-color="#155c12" />
		</radialGradient>
		<radialGradient id={g('red')} cx="50%" cy="35%" r="70%">
			<stop offset="0" stop-color="#ffb4a2" />
			<stop offset=".5" stop-color="#e0452b" />
			<stop offset="1" stop-color="#7d1408" />
		</radialGradient>
		<radialGradient id={g('skin')} cx="50%" cy="40%" r="60%">
			<stop offset="0" stop-color="#9ad8ff" />
			<stop offset="1" stop-color="#2b78c9" />
		</radialGradient>
	</defs>

	{#if name === 'user'}
		<rect x="4" y="4" width="40" height="40" rx="6" fill="url(#{g('steel')})" stroke="#5f7186" />
		<circle cx="24" cy="19" r="8" fill="url(#{g('skin')})" stroke="#1d4f8a" />
		<path d="M10 40c1.5-8 7-12 14-12s12.5 4 14 12z" fill="url(#{g('blue')})" stroke="#1d4f8a" />
		<rect x="4" y="4" width="40" height="18" rx="6" fill="url(#{g('gloss')})" />
	{:else if name === 'folder'}
		<path d="M4 12a3 3 0 0 1 3-3h11l4 4h19a3 3 0 0 1 3 3v3H4z" fill="url(#{g('amber')})" stroke="#a87412" />
		<rect x="9" y="14" width="30" height="20" fill="url(#{g('paper')})" stroke="#9fb0c4" />
		<path d="M3 19h42l-3 21a3 3 0 0 1-3 2.6H9A3 3 0 0 1 6 40z" fill="url(#{g('amber')})" stroke="#a87412" />
		<path d="M4 20h40l-1 6H5z" fill="url(#{g('gloss')})" />
	{:else if name === 'briefcase'}
		<path d="M17 12v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" fill="none" stroke="#4a2c12" stroke-width="2.5" />
		<rect x="5" y="12" width="38" height="28" rx="4" fill="url(#{g('brown')})" stroke="#3f250e" />
		<rect x="5" y="22" width="38" height="3" fill="#3f250e" opacity=".55" />
		<rect x="21" y="20" width="6" height="7" rx="1" fill="url(#{g('amber')})" stroke="#7a520d" />
		<rect x="5" y="12" width="38" height="12" rx="4" fill="url(#{g('gloss')})" />
	{:else if name === 'gear'}
		<g transform="translate(24 24)">
			{#each Array(8) as _, i}
				<rect x="-3.5" y="-20" width="7" height="9" rx="1.5" fill="url(#{g('steel')})" stroke="#5f7186" transform="rotate({i * 45})" />
			{/each}
			<circle r="14" fill="url(#{g('steel')})" stroke="#5f7186" />
			<circle r="6" fill="url(#{g('blue')})" stroke="#1d4f8a" />
			<circle r="14" fill="url(#{g('gloss')})" />
		</g>
	{:else if name === 'mail'}
		<rect x="4" y="10" width="40" height="28" rx="3" fill="url(#{g('paper')})" stroke="#7d8ea3" />
		<path d="M5 12l19 15 19-15" fill="none" stroke="#7d8ea3" stroke-width="1.5" />
		<circle cx="38" cy="12" r="7" fill="url(#{g('blue')})" stroke="#1d4f8a" />
		<path d="M35 12h6M38 9v6" stroke="#fff" stroke-width="1.8" />
	{:else if name === 'terminal'}
		<rect x="4" y="7" width="40" height="34" rx="3" fill="#0c0c0c" stroke="#5f7186" />
		<rect x="4" y="7" width="40" height="6" rx="3" fill="url(#{g('steel')})" />
		<path d="M10 20l6 5-6 5" fill="none" stroke="#d6d6d6" stroke-width="2.2" />
		<rect x="19" y="29" width="10" height="2.4" fill="#d6d6d6" />
	{:else if name === 'notepad'}
		<rect x="9" y="5" width="30" height="38" rx="2" fill="url(#{g('paper')})" stroke="#7d8ea3" />
		<rect x="9" y="5" width="30" height="7" fill="url(#{g('blue')})" />
		{#each [17, 22, 27, 32, 37] as y}
			<rect x="13" {y} width="22" height="1.6" fill="#9fb0c4" />
		{/each}
	{:else if name === 'doc'}
		<path d="M11 4h18l9 9v31H11z" fill="url(#{g('paper')})" stroke="#7d8ea3" />
		<path d="M29 4v9h9" fill="#dfe7f0" stroke="#7d8ea3" />
		{#each [19, 24, 29, 34] as y}
			<rect x="15" {y} width="19" height="1.6" fill="#5d8fd0" />
		{/each}
	{:else if name === 'globe'}
		<circle cx="24" cy="24" r="19" fill="url(#{g('blue')})" stroke="#1d4f8a" />
		<path d="M14 15c5 2 6 6 4 9s1 6 4 8M30 9c-2 4 1 6 4 6s5 4 3 8" fill="none" stroke="#5fd04a" stroke-width="3" stroke-linecap="round" />
		<circle cx="24" cy="24" r="19" fill="url(#{g('gloss')})" />
	{:else if name === 'power'}
		<circle cx="24" cy="24" r="19" fill="url(#{g('red')})" stroke="#6b1207" />
		<path d="M17 16a11 11 0 1 0 14 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" />
		<path d="M24 11v12" stroke="#fff" stroke-width="3" stroke-linecap="round" />
	{/if}
</svg>

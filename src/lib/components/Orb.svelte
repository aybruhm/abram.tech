<script lang="ts">
	// Original start orb: glass sphere with an "A" monogram. Not the Windows logo.
	let { size = 38 }: { size?: number } = $props();
	const uid = $props.id();
</script>

<svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
	<defs>
		<radialGradient id="{uid}-o" cx="50%" cy="60%" r="60%">
			<stop offset="0" stop-color="#64d4ff" />
			<stop offset=".55" stop-color="#1b6fc4" />
			<stop offset="1" stop-color="#0a2a5e" />
		</radialGradient>
		<linearGradient id="{uid}-g" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#fff" stop-opacity=".9" />
			<stop offset="1" stop-color="#fff" stop-opacity="0" />
		</linearGradient>
		<radialGradient id="{uid}-glow" cx="50%" cy="100%" r="55%">
			<stop offset="0" stop-color="#b6f0ff" stop-opacity=".9" />
			<stop offset="1" stop-color="#b6f0ff" stop-opacity="0" />
		</radialGradient>
	</defs>
	<circle cx="32" cy="32" r="29" fill="url(#{uid}-o)" stroke="#041a3d" stroke-width="2" />
	<circle cx="32" cy="32" r="27" fill="url(#{uid}-glow)" />
	<path d="M32 14 L47 48 H40.5 L37.2 40 H26.8 L23.5 48 H17 Z M29 34.5 H35 L32 26.5 Z" fill="#fff" opacity=".96" />
	<ellipse cx="32" cy="20" rx="21" ry="12" fill="url(#{uid}-g)" />
</svg>

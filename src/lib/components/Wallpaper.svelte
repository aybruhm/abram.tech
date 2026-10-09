<!-- Original wallpaper: deep-water gradient with light ribbons (a nod to "hadal", the deepest ocean zone). -->
<div class="wall" aria-hidden="true">
	<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
		<defs>
			<linearGradient id="rib1" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0" stop-color="#7fe3ff" stop-opacity="0" />
				<stop offset=".45" stop-color="#9ff0ff" stop-opacity=".55" />
				<stop offset="1" stop-color="#3bb8ff" stop-opacity="0" />
			</linearGradient>
			<linearGradient id="rib2" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0" stop-color="#5fffd2" stop-opacity="0" />
				<stop offset=".6" stop-color="#7affd9" stop-opacity=".35" />
				<stop offset="1" stop-color="#5fffd2" stop-opacity="0" />
			</linearGradient>
			<filter id="soft"><feGaussianBlur stdDeviation="6" /></filter>
			<filter id="softer"><feGaussianBlur stdDeviation="22" /></filter>
		</defs>
		<g class="drift a" filter="url(#softer)">
			<path d="M-100 640 C 300 520, 600 760, 1000 600 S 1500 420, 1750 520" fill="none" stroke="url(#rib1)" stroke-width="120" />
		</g>
		<g class="drift b">
			<path d="M-100 600 C 300 500, 650 720, 1000 590 S 1500 430, 1750 500" fill="none" stroke="url(#rib1)" stroke-width="3" filter="url(#soft)" />
			<path d="M-100 615 C 300 515, 640 735, 1000 605 S 1500 445, 1750 515" fill="none" stroke="url(#rib1)" stroke-width="1.5" />
			<path d="M-100 700 C 350 600, 700 820, 1050 660 S 1500 520, 1750 610" fill="none" stroke="url(#rib2)" stroke-width="2" filter="url(#soft)" />
			<path d="M-100 720 C 350 625, 700 840, 1050 685 S 1500 545, 1750 635" fill="none" stroke="url(#rib2)" stroke-width="1" />
		</g>
		{#each Array(26) as _, i}
			<circle
				class="mote"
				cx={(i * 263) % 1600}
				cy={180 + ((i * 397) % 700)}
				r={1 + (i % 3)}
				style:animation-delay="{-(i * 1.7)}s"
				style:animation-duration="{14 + (i % 7) * 3}s"
			/>
		{/each}
	</svg>
</div>

<style>
	.wall {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background:
			radial-gradient(ellipse 70% 55% at 62% 58%, rgba(40, 170, 220, 0.55), transparent 70%),
			radial-gradient(ellipse 60% 50% at 18% 30%, rgba(30, 90, 170, 0.6), transparent 70%),
			radial-gradient(ellipse 90% 70% at 50% 120%, rgba(0, 200, 170, 0.35), transparent 70%),
			linear-gradient(170deg, #06213f 0%, #0b3c6e 45%, #0a5a86 70%, #06314f 100%);
	}
	svg {
		width: 100%;
		height: 100%;
	}
	.drift {
		animation: drift 26s ease-in-out infinite alternate;
		transform-origin: center;
	}
	.drift.b {
		animation-duration: 34s;
	}
	@keyframes drift {
		to {
			transform: translate(-40px, 18px) scaleY(1.08);
		}
	}
	.mote {
		fill: #bff3ff;
		opacity: 0.35;
		animation: rise linear infinite;
	}
	@keyframes rise {
		from {
			transform: translateY(80px);
			opacity: 0;
		}
		20% {
			opacity: 0.45;
		}
		to {
			transform: translateY(-260px);
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.drift,
		.mote {
			animation: none;
		}
	}
</style>

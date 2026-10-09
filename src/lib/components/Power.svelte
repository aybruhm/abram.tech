<script lang="ts">
	import Orb from './Orb.svelte';

	let {
		mode,
		ondone
	}: {
		/** boot: startup splash; off: after "Shut down" */
		mode: 'boot' | 'shutting' | 'off';
		ondone: () => void;
	} = $props();
</script>

{#if mode === 'boot'}
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div class="screen boot" onclick={ondone} onanimationend={(e) => e.animationName.endsWith('fadeout') && ondone()}>
		<div class="mark"><Orb size={92} /></div>
		<p>Starting abram.tech</p>
		<div class="bar"><span></span></div>
	</div>
{:else if mode === 'shutting'}
	<div class="screen blue" onanimationend={ondone}>
		<div class="spinner" aria-hidden="true"></div>
		<p>Shutting down...</p>
	</div>
{:else}
	<div class="screen off">
		<p>It is now safe to close this tab.</p>
		<button onclick={ondone}>Start again</button>
	</div>
{/if}

<style>
	.screen {
		position: fixed;
		inset: 0;
		z-index: 200000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 18px;
		color: #fff;
		font-size: 18px;
		text-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
	}
	p {
		margin: 0;
	}
	.boot {
		background: #000;
		animation: fadeout 400ms ease-in 1900ms forwards;
	}
	.mark {
		animation: glow 1.4s ease-in-out infinite alternate;
	}
	@keyframes glow {
		from {
			filter: drop-shadow(0 0 4px rgba(90, 200, 255, 0.4));
		}
		to {
			filter: drop-shadow(0 0 22px rgba(90, 200, 255, 0.95));
		}
	}
	.bar {
		width: 160px;
		height: 12px;
		padding: 2px;
		border: 1px solid #555;
		border-radius: 3px;
		overflow: hidden;
	}
	.bar span {
		display: block;
		width: 30%;
		height: 100%;
		background: linear-gradient(180deg, #8fe58a, #2f9c2a 50%, #1f7f1b 51%, #57c552);
		box-shadow: 8px 0 0 -2px rgba(80, 200, 80, 0.5), 16px 0 0 -4px rgba(80, 200, 80, 0.25);
		animation: sweep 1.2s linear infinite;
	}
	@keyframes sweep {
		from {
			transform: translateX(-120%);
		}
		to {
			transform: translateX(380%);
		}
	}
	@keyframes fadeout {
		to {
			opacity: 0;
			visibility: hidden;
		}
	}
	.blue {
		background: radial-gradient(ellipse at 50% 40%, #1d6fb8, #0b3563 70%);
		animation: hold 1800ms linear forwards;
	}
	@keyframes hold {
		to {
			opacity: 1;
		}
	}
	.spinner {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 3px solid rgba(255, 255, 255, 0.25);
		border-top-color: #9fe3ff;
		animation: spin 0.9s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	.off {
		background: #000;
		color: #c8c8c8;
		font-size: 15px;
	}
	.off button {
		padding: 6px 18px;
		border: 1px solid #444;
		border-radius: 3px;
		background: linear-gradient(180deg, #3a3a3a, #1c1c1c);
		color: #ddd;
		font: inherit;
		cursor: pointer;
	}
	.off button:hover {
		border-color: #6fb6ff;
		color: #fff;
	}
	@media (prefers-reduced-motion: reduce) {
		.boot {
			animation-duration: 1ms;
			animation-delay: 300ms;
		}
		.mark,
		.bar span,
		.spinner {
			animation: none;
		}
	}
</style>

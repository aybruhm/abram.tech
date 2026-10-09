<script lang="ts">
	const text = `readme.txt
==========

What this is
------------
A personal site dressed as a 2009 desktop. Every section is a window:
drag it, minimise it, maximise it, close it. The Start menu has search,
and the Command Prompt takes real commands (type "help").

Links that open a window directly:
  abram.tech/#about   #projects   #skills   #contact   #cmd

How it is served
----------------
  Visitor -> Cloudflare edge -> Cloudflare Tunnel -> cloudflared on hadal
          -> Caddy (127.0.0.1:8080) -> static files built by SvelteKit

hadal is a repurposed laptop running Debian at home. The tunnel is an
outbound connection, so no port on the home router is open to the internet.

Built with
----------
  SvelteKit 3 (static adapter), Svelte 5, TypeScript.
  No UI library. Glass, icons and wallpaper are hand-made CSS and SVG.

This desktop is a tribute to the Aero era, not affiliated with Microsoft.
`;
</script>

<div class="notepad">
	<div class="menubar" aria-hidden="true">
		<span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span>
	</div>
	<textarea readonly aria-label="readme.txt">{text}</textarea>
</div>

<style>
	.notepad {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.menubar {
		display: flex;
		gap: 2px;
		padding: 2px 4px;
		border-bottom: 1px solid #e5e5e5;
		background: linear-gradient(180deg, #fff, #f0f4f9);
		font-size: 12px;
	}
	.menubar span {
		padding: 2px 6px;
		border: 1px solid transparent;
		border-radius: 2px;
	}
	.menubar span:hover {
		border-color: #a8d8eb;
		background: #e5f3fb;
	}
	textarea {
		flex: 1;
		margin: 0;
		padding: 4px 6px;
		border: 0;
		resize: none;
		outline: none;
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1.4;
		white-space: pre;
		overflow: auto;
	}
</style>

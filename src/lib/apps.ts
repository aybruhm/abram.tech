import type { Component } from 'svelte';
import About from './apps/About.svelte';
import Projects from './apps/Projects.svelte';
import Experience from './apps/Experience.svelte';
import Skills from './apps/Skills.svelte';
import Contact from './apps/Contact.svelte';
import Cmd from './apps/Cmd.svelte';
import Readme from './apps/Readme.svelte';
import type { IconName } from './components/Icon.svelte';

/**
 * App registry. To add a window:
 *   1. create src/lib/apps/MyThing.svelte
 *   2. add an entry below (the key becomes the URL hash: abram.tech/#mything)
 *   3. optionally add an icon in components/Icon.svelte
 */
export const apps = {
	about: {
		title: 'About Abram',
		icon: 'user',
		component: About,
		size: [700, 600],
		desktop: true,
		pinned: true
	},
	projects: {
		title: 'Projects',
		icon: 'folder',
		component: Projects,
		size: [780, 540],
		desktop: true,
		pinned: true
	},
	experience: {
		title: 'Experience',
		icon: 'briefcase',
		component: Experience,
		size: [640, 560],
		desktop: true,
		pinned: true
	},
	skills: {
		title: 'Programs and Features',
		icon: 'gear',
		component: Skills,
		size: [700, 500],
		desktop: true,
		pinned: false
	},
	contact: {
		title: 'New Message',
		icon: 'mail',
		component: Contact,
		size: [560, 440],
		desktop: true,
		pinned: true
	},
	cmd: {
		title: 'Command Prompt',
		icon: 'terminal',
		component: Cmd,
		size: [680, 420],
		desktop: true,
		pinned: false
	},
	readme: {
		title: 'readme.txt - Notepad',
		icon: 'notepad',
		component: Readme,
		size: [560, 420],
		desktop: true,
		pinned: false
	}
} satisfies Record<
	string,
	{
		title: string;
		icon: IconName;
		component: Component;
		size: [number, number];
		desktop: boolean;
		pinned: boolean;
	}
>;

export type AppId = keyof typeof apps;

export const appIds = Object.keys(apps) as AppId[];

export const isAppId = (v: string): v is AppId => v in apps;

/** Short labels for desktop icons and the Start menu. */
export const labels: Record<AppId, string> = {
	about: 'About Me',
	projects: 'Projects',
	experience: 'Experience',
	skills: 'Skills',
	contact: 'Contact',
	cmd: 'Command Prompt',
	readme: 'readme.txt'
};

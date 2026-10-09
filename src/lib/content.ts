/**
 * Everything the site says about you lives in this file.
 * Edit text here; the windows render whatever is in these objects.
 * Empty strings ('') hide a field or link.
 */

export type Link = { label: string; href: string };

export const profile = {
	name: 'Abram',
	headline: 'AI Engineer',
	subhead: 'Built on backend and cloud infrastructure',
	location: 'Oxford, UK',
	current: {
		role: 'Founding Engineer',
		company: 'BidScript',
		focus: 'Retrieval and agent layer of a bid management platform'
	},
	summary: [
		'I build the systems underneath AI products: retrieval pipelines, agent runtimes, and the backend and cloud infrastructure they run on.',
		'Self-taught. My foundation comes from Harvard CS50, Designing Data-Intensive Applications, The Pragmatic Programmer, and two and a half years of structured independent study.',
		'I prefer the work to speak for itself, so most of this site is the work.'
	],
	email: 'developer@abram.tech',
	links: [
		{ label: 'GitHub', href: '' },
		{ label: 'LinkedIn', href: '' },
		{ label: 'Substack', href: '' }
	] satisfies Link[]
};

export type Project = {
	name: string;
	tagline: string;
	status: 'Active' | 'Design' | 'Shipped' | 'Live';
	stack: string[];
	details: string[];
	href: string;
};

export const projects: Project[] = [
	{
		name: 'Waypoint',
		tagline: 'Fault-tolerant SDK for LLM agent workflows',
		status: 'Active',
		stack: ['Python', 'Hexagonal architecture'],
		details: [
			'Open-source SDK that keeps multi-step agent workflows recoverable when models, tools or networks fail.',
			'Phase 1 shipped on a hexagonal (ports and adapters) core. Phase 2 adds concurrent execution.'
		],
		href: ''
	},
	{
		name: 'Provenance',
		tagline: 'Compliance and governance middleware for agentic systems',
		status: 'Active',
		stack: ['Python', 'Agents'],
		details: [
			'Open-source middleware that sits between agents and the actions they take, so every decision is policy-checked and auditable.'
		],
		href: ''
	},
	{
		name: 'Assay',
		tagline: 'Durable financial planning agent',
		status: 'Active',
		stack: ['Python', 'LangGraph'],
		details: [
			'A LangGraph workflow agent that builds financial plans from a user\'s preferences and country.',
			'Money is stored as fixed-scale integers. No floats, no Decimal type, no rounding surprises.'
		],
		href: ''
	},
	{
		name: 'Folio',
		tagline: 'Self-hostable investment tracker',
		status: 'Design',
		stack: ['Self-hosted'],
		details: ['Track holdings and performance on your own hardware, with no third party holding your data.'],
		href: ''
	},
	{
		name: 'hadal',
		tagline: 'The home lab serving this page',
		status: 'Live',
		stack: ['Debian', 'Docker', 'Caddy', 'Cloudflare Tunnel', 'Tailscale'],
		details: [
			'A repurposed laptop running Debian. This site reaches you through an outbound Cloudflare Tunnel, so no port on my router is open.',
			'Private services (search, vector and relational databases) sit behind Caddy and are reachable only over Tailscale.'
		],
		href: ''
	}
];

export type Role = {
	company: string;
	role: string;
	period: string;
	summary: string;
	points: string[];
};

export const experience: Role[] = [
	{
		company: 'BidScript',
		role: 'Founding Engineer',
		period: '2026 to present',
		summary: 'AI bid and tender response platform.',
		points: ['Own the retrieval and agent layer.']
	},
	{
		company: 'AiMation (OmniGen)',
		role: 'Contract engineer',
		period: '',
		summary: 'AI film production SaaS.',
		points: ['Owned backend, DevOps, security architecture and AI orchestration.']
	},
	{
		company: 'Agenta.ai',
		role: '',
		period: '',
		summary: 'Open-source LLMOps platform, Berlin.',
		points: [
			'Led the MongoDB to PostgreSQL migration, with a 200% query performance improvement.',
			'Optimised batch pipelines.',
			'Designed multi-tenant architecture.'
		]
	},
	{
		company: 'AbaaChatPay',
		role: '',
		period: '',
		summary: 'Fintech.',
		points: ['Shipped production ML for biometric authentication.']
	},
	{
		company: 'Wyreng, Sendme, Bravewood',
		role: '',
		period: '',
		summary: 'Earlier fintech roles.',
		points: []
	}
];

export const openSource: { project: string; note: string }[] = [
	{ project: 'Agenta.ai', note: 'LLMOps platform' },
	{ project: 'AutSPACEs', note: 'The Alan Turing Institute' },
	{ project: 'Air', note: 'FastAPI/Pydantic web framework: query parameter support, positional-only parameter fix' }
];

export type Skill = { name: string; group: string; usedFor: string };

export const skills: Skill[] = [
	{ name: 'Python', group: 'Languages', usedFor: 'APIs, agents, data pipelines' },
	{ name: 'TypeScript', group: 'Languages', usedFor: 'Services and frontends' },
	{ name: 'FastAPI', group: 'Backend', usedFor: 'Production APIs' },
	{ name: 'Django', group: 'Backend', usedFor: 'Web applications' },
	{ name: 'Node.js', group: 'Backend', usedFor: 'Services and tooling' },
	{ name: 'React', group: 'Frontend', usedFor: 'Product UIs' },
	{ name: 'Svelte', group: 'Frontend', usedFor: 'This site' },
	{ name: 'LangGraph', group: 'AI', usedFor: 'Durable agent workflows' },
	{ name: 'Retrieval (RAG)', group: 'AI', usedFor: 'Search and grounding for agents' },
	{ name: 'LLMOps', group: 'AI', usedFor: 'Evaluation, tracing, deployment' },
	{ name: 'PostgreSQL', group: 'Data', usedFor: 'Primary datastore' },
	{ name: 'MongoDB', group: 'Data', usedFor: 'Document workloads, migrations off it' },
	{ name: 'Qdrant', group: 'Data', usedFor: 'Vector search' },
	{ name: 'Elasticsearch', group: 'Data', usedFor: 'Full-text search' },
	{ name: 'AWS', group: 'Infrastructure', usedFor: 'EC2, S3, CloudFront, Lambda, CloudWatch' },
	{ name: 'Docker', group: 'Infrastructure', usedFor: 'Everything that runs' },
	{ name: 'Linux', group: 'Infrastructure', usedFor: 'Servers and daily driver' }
];

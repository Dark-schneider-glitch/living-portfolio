export const PERSON = {
  name: 'Mayank Thakur',
  role: 'IT Support Professional · AI Web Creator',
  tagline: 'Reliable IT. Smarter automation. Better websites.',
  bio: 'IT support professional with 6+ years of experience in desktop support, network troubleshooting, and system administration. I also build websites, landing pages, and portfolios with AI, and create practical automations with n8n.',
  email: 'mayankt648@gmail.com',
  phone: '+91 7701806130',
  location: 'Delhi, India',
  linkedin: 'https://www.linkedin.com/in/mayank-thakur-bb1728278/',
  youtube: 'https://www.youtube.com/@ITnauts',
  resume: '/mayank-thakur-cv.pdf',
};

export const SKILL_GROUPS = [
  {
    name: 'Systems & operating systems',
    skills: ['Windows Server / Desktop', 'Linux (CentOS)', 'Active Directory', 'DNS & DHCP'],
  },
  {
    name: 'Networking & end-user support',
    skills: ['LAN / WAN', 'TCP/IP', 'Router configuration', 'Hardware troubleshooting', 'Helpdesk support'],
  },
  {
    name: 'Security & remote support',
    skills: [
      'Sophos Firewall',
      'Endpoint protection',
      'Seqrite',
      'DLP',
      'Synology NAS',
      'CCTV installation',
      'TeamViewer',
      'AnyDesk',
      'UltraViewer',
    ],
  },
  {
    name: 'Business systems & automation',
    skills: [
      'FINSYS ERP',
      'n8n workflows',
      'AI-assisted web creation',
      'Docker',
      'Kubernetes (learning)',
      'AI agents with n8n (learning)',
    ],
  },
];

export const EDUCATION = [
  {
    title: 'Diploma in Hardware and Networking',
    detail: 'Troubleshooting, networking, system administration, and hands-on labs',
    dates: 'Sep 2021',
  },
  {
    title: 'Bachelor of Arts (Political Science Honours)',
    detail: 'Second Division',
    dates: '2020 — 2023',
  },
  {
    title: 'Diploma in Cyber Security',
    detail: 'Jetking',
    dates: 'Feb 2024 — Oct 2024',
  },
  {
    title: 'Cloud Computing & Cybersecurity',
    detail: 'Currently learning',
    dates: 'In progress',
  },
];

export const EXPERIENCE = [
  {
    role: 'IT Admin',
    company: 'Chaudhary Labels & Pvt. Ltd.',
    location: 'Delhi',
    dates: 'Nov 2023 — Present',
    highlights: [
      'Manage Windows Server systems for 150+ users, maintaining 99% uptime.',
      'Resolve 15+ FINSYS ERP issues monthly and provide remote and on-site support, resolving 90% on first contact.',
      'Configure Sophos Firewall policies and maintain DLP protection across endpoints, email, and NAS storage.',
      'Installed and configured CentOS server, reducing security vulnerabilities by 25%.',
    ],
  },
  {
    role: 'Network Engineer',
    company: 'Prabhu Darbar Foundation',
    location: 'Delhi',
    dates: 'Sep 2022 — Aug 2023',
    highlights: [
      'Supported 100+ users with desktop and network issues.',
      'Improved system uptime by 20% and maintained 99% network availability.',
    ],
  },
  {
    role: 'Desktop Support Technician',
    company: 'Ansh IT Solutions',
    location: 'Delhi',
    dates: 'May 2020 — Aug 2022',
    highlights: [
      'Provided desktop support for 100+ users across hardware and software issues.',
      'Assembled and tested systems and performed maintenance that improved reliability by 15%.',
    ],
  },
];

export const PROJECTS = [
  {
    id: 'office-relocation',
    title: 'Office relocation setup',
    description:
      'Led a team to assemble and configure 15+ desktop systems in one day, keeping the office operational throughout the move.',
    metric: '15+ systems',
    metricLabel: 'configured in one day',
    tags: ['Desktop setup', 'Hardware', 'IT support'],
  },
  {
    id: 'system-monitoring',
    title: 'System monitoring & issue resolution',
    description:
      'Proactively identified and resolved network and system issues to improve uptime and help teams get support faster.',
    metric: '+25%',
    metricLabel: 'uptime improvement',
    tags: ['Monitoring', 'Troubleshooting', 'Network support'],
  },
];

export const JOURNEY_CHAPTERS = [
  {
    id: 'desk',
    title: 'Home',
    subtitle: 'Mayank Thakur · IT Support & AI Web Creator',
    bgGradient: 'from-void-950 via-void-900 to-orange-950/20',
  },
  {
    id: 'learn',
    title: 'Skills',
    subtitle: 'Systems, networking, security, and support',
    bgGradient: 'from-orange-950/30 via-void-950 to-caution-600/10',
  },
  {
    id: 'code',
    title: 'Services',
    subtitle: 'Websites, AI, and automation',
    bgGradient: 'from-caution-600/20 via-void-950 to-orange-950/20',
  },
  {
    id: 'build',
    title: 'Projects',
    subtitle: 'Real work with measurable impact',
    bgGradient: 'from-void-950 via-orange-950/20 to-void-900',
  },
  {
    id: 'celebrate',
    title: 'Experience',
    subtitle: 'A career in IT support and administration',
    bgGradient: 'from-caution-500/30 via-void-950 to-orange-600/20',
  },
  {
    id: 'present',
    title: 'Contact',
    subtitle: "Let's build something useful",
    bgGradient: 'from-void-900 via-orange-950 to-void-950',
  },
] as const;

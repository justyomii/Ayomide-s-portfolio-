export const site = {
  name: "Adeyi Ayomide Ephrathah",
  shortName: "Ayomide",
  alias: "Kardeeah",
  title: "Virtual Personal Assistant",
  subtitle: "Operations & Community Support",
  email: "adeyiephrathah@gmail.com",
  linkedin: "https://www.linkedin.com/in/ayomide-adeyi-678395420",
  calendly: "https://cal.com/ayomide-adeyi-mum7tp",
  resumeUrl: "/Adeyi_Ayomide_VA_CV.pdf",
  phone: "+234 815 565 8621",
  portfolioUrl: "https://ayoadeyi.vercel.app",
  location: "Nigeria",
  timezone: "Flexible with European hours",
  copyright: "© 2026 Adeyi Ayomide Ephrathah",
  tagline: "Nigeria · Remote · European hours",
} as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
] as const;

// Availability status shown as a chip in the hero.
// Update `state` to "open" | "limited" | "closed" as capacity changes.
export const availability = {
  state: "open" as "open" | "limited" | "closed",
  label: "Accepting new clients",
  detail: "European mornings · 1–2 slots open",
} as const;

export const hero = {
  headline: "Support that runs",
  headlineAccent: "quietly.",
  name: site.name,
  role: `${site.title} · ${site.subtitle}`,
  tagline:
    "I run inbox, calendar, travel, and daily operations for founders and small teams — so you stay focused on the work only you can do.",
  primaryCta: { label: "See selected work", href: "#work" },
  bookCta: { label: "Book a 15-min call", href: site.calendly },
  stats: [
    { value: "3+", label: "years supporting founders" },
    { value: "5", label: "core service areas" },
    { value: "24h", label: "reply window" },
  ],
} as const;

export const about = {
  label: "About",
  headline: "The person behind the work",
  imageAlt: "Adeyi Ayomide Ephrathah, virtual personal assistant",
  paragraphs: [
    "I'm a virtual assistant based in Nigeria, supporting founders and small teams with admin, operations, travel, and community work. I stay organized, communicate clearly, and handle the details before they become problems.",
    "I've built content systems for KD Essence, a perfume and skincare brand; managed community and communications for Phoenix, a Web3 project, under the alias Kardeeah; and coordinated daily operations for Paladin's Hub, a student delivery marketplace.",
    "I'm ALX-certified in Virtual Assistance and trained in Customer Service and Professionalism through Forage. I work fully remote with availability aligned to European time zones.",
  ],
  highlights: [
    { label: "Certification", value: "ALX Virtual Assistance" },
    { label: "Training", value: "Forage · Customer Service" },
    { label: "Based in", value: "Nigeria · fully remote" },
    { label: "Hours", value: "Aligned to European time" },
    { label: "Response", value: "Within 24 hours" },
  ],
} as const;

export const expertise = {
  label: "Expertise",
  headline: "What I take off your plate",
  lead: "Admin and travel come first. Social and community support when you need it.",
  items: [
    {
      title: "Inbox & email",
      description: "Triage, draft replies, and surface only what needs your decision.",
      tools: ["Gmail", "Outlook", "Notion"],
    },
    {
      title: "Calendar & travel",
      description: "Scheduling, itineraries, bookings, and confirmations filed before you move.",
      tools: ["Google Calendar", "Calendly", "TripIt"],
    },
    {
      title: "Operations",
      description: "Client notes, order tracking, SOPs, and the admin that keeps things moving.",
      tools: ["Notion", "Google Workspace", "Airtable"],
    },
    {
      title: "Social & community",
      description: "Content planning, posting, replies, and consistent brand voice.",
      tools: ["Instagram", "Canva", "Discord"],
    },
    {
      title: "Research",
      description: "Vendor research, competitive notes, and tasks that clear your queue.",
      tools: ["Google Sheets", "Notion", "Perplexity"],
    },
  ],
} as const;

export type CaseStudy = {
  id: string;
  title: string;
  role: string;
  tags: string[];
  summary: string;
  metrics?: { value: string; label: string }[];
  links?: { label: string; href: string }[];
  caseStudy: {
    overview: string;
    challenge: string;
    approach: string[];
    results: string[];
    tools: string[];
  };
};

export const work = {
  label: "Work",
  headline: "Selected projects",
  lead: "Three engagements where reliability and clear communication were the deliverable.",
  items: [
    {
      id: "kd-essence",
      title: "KD Essence",
      role: "Social media & content",
      tags: ["Skincare", "Perfume"],
      summary:
        "Built the visual identity, content rhythm, and launch assets that took KD Essence from zero to a cohesive social presence.",
      metrics: [
        { value: "0→launch", label: "brand system from scratch" },
        { value: "3", label: "product launches supported" },
        { value: "Weekly", label: "posting cadence held" },
      ],
      links: [
        { label: "@shopwithkdessence", href: "https://instagram.com/shopwithkdessence" },
        { label: "kdessence.vercel.app", href: "https://kdessence.vercel.app" },
      ],
      caseStudy: {
        overview:
          "KD Essence needed a full social and content foundation: a visual identity, a posting rhythm, and launch-ready assets that could carry the brand from first post to first product drop.",
        challenge:
          "No content system, inconsistent brand voice, and product launches that required coordinated rollout across Instagram and web.",
        approach: [
          "Built a visual content system aligned with brand positioning and product story",
          "Set up a weekly posting calendar with defined content pillars",
          "Coordinated launch sequences across Instagram, WhatsApp, and web",
          "Wrote reply templates and a lightweight brand voice guide for consistency",
        ],
        results: [
          "Consistent visual identity across every customer touchpoint",
          "Weekly posting cadence held without founder involvement",
          "Three product launches shipped with coordinated assets",
          "Active Instagram at @shopwithkdessence",
        ],
        tools: ["Instagram", "Canva", "Notion", "Vercel"],
      },
    },
    {
      id: "phoenix",
      title: "Phoenix",
      role: "Community management",
      tags: ["Web3"],
      summary:
        "Held Watcher, Keeper, and Social Media Manager roles for a Web3 community — steady communication through a fast-moving environment.",
      metrics: [
        { value: "3", label: "roles held simultaneously" },
        { value: "24/7", label: "moderation coverage in shifts" },
        { value: "Zero", label: "escalations missed on shift" },
      ],
      caseStudy: {
        overview:
          "Phoenix operates in rapid, high-uncertainty conditions where community sentiment can shift in minutes. I held multiple roles under the alias Kardeeah, keeping communication steady through volatile stretches.",
        challenge:
          "Volatile market periods, community tension during launches, and the need for consistent moderation at scale across Discord and X.",
        approach: [
          "Managed real-time communication across Discord and X during high-traffic moments",
          "Moderated discussions with clear standards documented for other mods",
          "Coordinated social messaging with leadership during launches and market events",
          "Documented community decisions, updates, and incidents in a shared log",
        ],
        results: [
          "Stable communication held through volatile periods",
          "Moderation standards adopted by other mods on the team",
          "Consistent social presence during launches",
          "Trusted point of contact for leadership when things moved fast",
        ],
        tools: ["Discord", "Twitter/X", "Notion", "Google Docs"],
      },
    },
    {
      id: "paladins-hub",
      title: "Paladin's Hub",
      role: "Operations",
      tags: ["Marketplace"],
      summary:
        "Coordinated orders and daily operations for a student delivery marketplace — fewer dropped handoffs, clearer status for everyone in the flow.",
      metrics: [
        { value: "3-way", label: "student · vendor · customer handoffs" },
        { value: "Daily", label: "operations run without micromanagement" },
        { value: "0", label: "founder-side firefighting on comms" },
      ],
      caseStudy: {
        overview:
          "Paladin's Hub connects students to on-demand delivery. I handled order flow, status tracking, and the day-to-day coordination that kept students, vendors, and customers all on the same page.",
        challenge:
          "High order volume, three parties per handoff (student, vendor, customer), and tracking that couldn't afford to miss a step.",
        approach: [
          "Coordinated orders end-to-end between students, vendors, and customers",
          "Maintained a live status tracker and running operational notes",
          "Handled inbound client communications and issue resolution before they reached the founder",
          "Supported daily scheduling for delivery operations",
        ],
        results: [
          "Fewer missed handoffs across the order flow",
          "Operations running without founder micromanagement",
          "Clear communication channels for every stakeholder",
          "Documented processes that made continuity easy",
        ],
        tools: ["Google Sheets", "WhatsApp", "Notion", "Gmail"],
      },
    },
  ] satisfies CaseStudy[],
} as const;

// TODO(ayomide): replace these with real quotes before sharing publicly.
// Ask each founder for one sentence they'd genuinely say on a call.
// Leave `items` empty to hide the section entirely.
export const testimonials = {
  label: "Testimonials",
  headline: "In their words",
  lead: "A few words from the founders I've worked with.",
  items: [
    {
      quote:
        "Ayomide runs our community like it's her own. She catches things we'd miss, keeps the tone steady, and only pulls us in when a decision actually needs us.",
      author: "Phoenix team lead",
      role: "Web3 community",
      // TODO: replace with real attribution + optional avatar
    },
    {
      quote:
        "She built our content system from scratch and held the posting rhythm week after week. We stopped worrying about Instagram and started seeing traction.",
      author: "KD Essence founder",
      role: "Skincare & perfume brand",
    },
    {
      quote:
        "Orders stopped falling through the cracks the week she started. Customers, vendors, and students all knew where their order stood, without me chasing anyone.",
      author: "Paladin's Hub founder",
      role: "Student delivery marketplace",
    },
  ],
} as const;

// Engagement shapes — no prices. Scope and rate are set on the discovery call.
export const packages = {
  label: "Engagements",
  headline: "Ways to work together",
  lead: "Three shapes of engagement, depending on the work. Scope, cadence, and rate are set on the discovery call.",
  items: [
    {
      name: "Trial week",
      tagline: "A short, defined test.",
      description:
        "One workflow taken off your plate for a week — inbox, calendar, or a single ops project — with a written summary at the end. A low-commitment way to see how we work together before anything longer.",
      cta: { label: "Start with a trial", href: "#contact" },
    },
    {
      name: "Ongoing retainer",
      tagline: "Steady hands, month after month.",
      description:
        "Ongoing inbox, calendar, travel, and operations support at a hours-per-month cadence we set together. Weekly Friday note, shared Notion, priority reply within 24 hours.",
      featured: true,
      cta: { label: "Book a discovery call", href: site.calendly },
    },
    {
      name: "Project sprint",
      tagline: "One defined outcome, hard end date.",
      description:
        "A launch, an event, a migration, a research sprint — scoped up front with clear deliverables. Milestone updates twice a week, final handover doc at the end.",
      cta: { label: "Scope a sprint", href: "#contact" },
    },
  ],
} as const;

export const process = {
  label: "Process",
  headline: "How I work",
  lead: "A predictable rhythm so you always know what's happening.",
  steps: [
    {
      title: "Discovery",
      description:
        "One call to align on priorities, tools, and what \"done\" looks like. You leave with a written scope and a start date.",
      artifact: "Written scope + start date",
    },
    {
      title: "Setup",
      description:
        "I set up a shared Notion, mirror your tools, and document the first SOPs so the work has a home from day one.",
      artifact: "Shared Notion workspace",
    },
    {
      title: "Rhythm",
      description:
        "I run tasks quietly, keep a running log, and send a short Friday note so you always know where things stand.",
      artifact: "Weekly Friday note",
    },
    {
      title: "Handoff",
      description:
        "When work ships or we wrap, you get a clean handover doc — decisions, files, follow-ups — so nothing is stuck in my head.",
      artifact: "Handover doc",
    },
  ],
} as const;

export const certifications = {
  label: "Credentials",
  headline: "Training & certification",
  items: [
    {
      title: "ALX Virtual Assistance",
      issuer: "ALX Africa",
      description: "Professional certification in virtual assistance practice.",
    },
    {
      title: "Customer Service & Professionalism",
      issuer: "Forage",
      description: "Training in client communication and service standards.",
    },
  ],
} as const;

export const faq = {
  label: "FAQ",
  headline: "Questions founders ask",
  items: [
    {
      question: "How do we start?",
      answer:
        "Book a 15-minute discovery call. If it's a fit, I send a written scope and we agree on a start date — usually within the same week.",
    },
    {
      question: "Is there a trial?",
      answer:
        "Yes. The Trial week is a defined, low-commitment way to see how we work together before starting a retainer. You leave the week with a written summary either way.",
    },
    {
      question: "Which time zones do you cover?",
      answer:
        "I'm based in Nigeria and my working hours are aligned to European time. Mornings-to-early-afternoon Central European Time is my sweet spot.",
    },
    {
      question: "How do we communicate?",
      answer:
        "Async by default — Slack, email, or your tool of choice. Sync when it saves time: a weekly check-in and a written Friday note keep us on the same page.",
    },
    {
      question: "Which tools do you use?",
      answer:
        "Notion, Google Workspace, Gmail, Outlook, Airtable, Discord, Slack, Calendly, Canva. I adapt to your stack rather than pushing my own.",
    },
    {
      question: "What isn't in scope?",
      answer:
        "Bookkeeping, legal, design work beyond social content, and anything requiring specialist certification. I'll flag it and point you to the right person.",
    },
  ],
} as const;

export const contact = {
  label: "Contact",
  headline: "Let's talk",
  lead: "Send a message or book a call. I reply within 24 hours.",
  bookCall: { label: "Book a 15-minute call", href: site.calendly },
  directEmail: site.email,
} as const;

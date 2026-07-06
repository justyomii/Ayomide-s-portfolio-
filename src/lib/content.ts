export const site = {
  name: "Adeyi Ayomide Ephrathah",
  shortName: "Ayomide",
  alias: "Kardeeah",
  title: "Virtual Personal Assistant",
  subtitle: "Operations & Community Support",
  email: "adeyiephrathah@gmail.com",
  linkedin: null as string | null,
  calendly: "https://cal.com/ayomide-adeyi-mum7tp",
  resumeUrl: "/Adeyi_Ayomide_VA_CV.pdf",
  phone: "+234 703 487 1669",
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
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  headline: "Support that runs",
  headlineAccent: "quietly.",
  name: site.name,
  role: `${site.title} · ${site.subtitle}`,
  tagline:
    "I take on inbox, calendar, travel, and day-to-day operations so founders stay focused on the work only they can do.",
  primaryCta: { label: "View work", href: "#work" },
  bookCta: { label: "Book a call", href: site.calendly },
} as const;

export const about = {
  label: "About",
  headline: "The person behind the work",
  imageAlt: "Adeyi Ayomide Ephrathah, virtual personal assistant",
  paragraphs: [
    "I'm a virtual assistant based in Nigeria, supporting founders and business owners with admin, operations, travel, and community work. I stay organized, communicate clearly, and handle the details before they become problems.",
    "I've built content systems for KD Essence, a perfume and skincare brand; managed community and communications for Phoenix, a Web3 project, as Kardeeah; and coordinated daily operations for Paladin's Hub, a student delivery marketplace.",
    "I'm ALX-certified in Virtual Assistance and trained in Customer Service and Professionalism through Forage. I work fully remote with availability aligned to European time zones.",
  ],
  highlights: [
    { label: "Certification", value: "ALX Virtual Assistance" },
    { label: "Training", value: "Forage, Customer Service" },
    { label: "Based in", value: "Nigeria, fully remote" },
    { label: "Hours", value: "Flexible with European time" },
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
        "Built visual identity, content rhythm, and launch assets for a perfume and skincare brand, from zero to a cohesive social presence.",
      links: [
        { label: "@shopwithkdessence", href: "https://instagram.com/shopwithkdessence" },
        { label: "kdessence.vercel.app", href: "https://kdessence.vercel.app" },
      ],
      caseStudy: {
        overview:
          "KD Essence needed a social and content foundation: visual identity, posting rhythm, and launch-ready assets.",
        challenge:
          "No content system, inconsistent brand voice, and launches requiring coordinated rollout.",
        approach: [
          "Built a visual content system aligned with brand positioning",
          "Set up posting calendar and content pillars",
          "Coordinated launch sequences across Instagram and web",
          "Wrote reply templates and brand voice guidelines",
        ],
        results: [
          "Consistent visual identity across touchpoints",
          "Posting calendar in place for ongoing content",
          "Launch campaigns with coordinated assets",
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
        "Watcher, Keeper, and Social Media Manager for a Web3 community. Steady communication through a fast-moving environment.",
      caseStudy: {
        overview:
          "Phoenix operates in rapid, high-uncertainty conditions. I held multiple roles under the alias Kardeeah.",
        challenge: "Volatile periods, community tension, and consistent moderation at scale.",
        approach: [
          "Managed real-time communication across channels",
          "Moderated discussions with clear standards",
          "Coordinated social messaging during key moments",
          "Documented community decisions and updates",
        ],
        results: [
          "Stable communication through volatile periods",
          "Moderation standards that reduced escalation",
          "Consistent social presence for the community",
          "Trusted point of contact for leadership",
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
        "Coordinated orders and daily operations for a student delivery marketplace. Fewer dropped handoffs, clearer status.",
      caseStudy: {
        overview:
          "Paladin's Hub connects students to on-demand delivery. I handled order flow and day-to-day coordination.",
        challenge: "High volume, multiple parties, and tracking that couldn't miss handoffs.",
        approach: [
          "Coordinated orders between students, vendors, and customers",
          "Maintained status tracking and operational notes",
          "Handled client communications and issue resolution",
          "Supported scheduling for delivery operations",
        ],
        results: [
          "Fewer missed handoffs in order flow",
          "Operations running without founder micromanagement",
          "Clear channels for all stakeholders",
          "Documented processes for continuity",
        ],
        tools: ["Google Sheets", "WhatsApp", "Notion", "Gmail"],
      },
    },
  ] satisfies CaseStudy[],
} as const;

export const process = {
  label: "Process",
  headline: "How I work",
  steps: [
    {
      title: "Discovery",
      description: "Align on priorities, tools, communication style, and what done looks like.",
    },
    {
      title: "Execution",
      description: "Own tasks quietly, document as I go, escalate only what needs you.",
    },
    {
      title: "Communication",
      description: "Proactive updates and summaries. You always know where things stand.",
    },
    {
      title: "Delivery",
      description: "Completed work, organized files, and a clean handoff.",
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

export const contact = {
  label: "Contact",
  headline: "Let's talk",
  lead: "Send a message or book a call. I reply within 24 hours.",
  bookCall: { label: "Book a 15-minute call", href: site.calendly },
  directEmail: site.email,
} as const;

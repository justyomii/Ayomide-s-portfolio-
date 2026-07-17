/**
 * Editorial light-theme CV — prints cleanly, forwards cleanly, ATS-friendly.
 * Run: npm run generate-cv
 */
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, PDFFont, PDFPage, rgb } from "pdf-lib";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const FONT_DIR = join(process.cwd(), "scripts", "fonts");
const readFont = (name: string) => readFileSync(join(FONT_DIR, name));

/* ----------- Page ----------- */
const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN_X = 56;
const MARGIN_Y = 56;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

/* ----------- Palette (light) ----------- */
const BG = rgb(0.984, 0.965, 0.953); // warm off-white
const INK = rgb(0.101, 0.094, 0.086);
const MUTED = rgb(0.42, 0.4, 0.376);
const ACCENT = rgb(0.545, 0.388, 0.278); // bronze
const RULE = rgb(0.83, 0.8, 0.76);

/* ----------- Type scale ----------- */
const T_NAME = 28;
const T_ROLE = 11;
const T_META = 9;
const T_SECTION = 9.5;
const T_BODY = 10;
const T_LEAD = 10.5;
const T_JOB = 11;
const T_JOB_META = 9.5;
const T_BULLET = 10;

const LINE_H_BODY = 14;
const LINE_H_TIGHT = 12.5;
const SECTION_TOP = 14;
const SECTION_BOTTOM = 10;

async function main() {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  // Portfolio fonts: Instrument Serif for headings, Plus Jakarta Sans for body.
  const sans = await pdf.embedFont(readFont("PlusJakartaSans-Regular.ttf"), { subset: true });
  const sansBold = await pdf.embedFont(readFont("PlusJakartaSans-Bold.ttf"), { subset: true });
  const serif = await pdf.embedFont(readFont("InstrumentSerif-Regular.ttf"), { subset: true });
  const serifItalic = await pdf.embedFont(readFont("InstrumentSerif-Italic.ttf"), { subset: true });

  // Mutable page context — a new page appended when we run out of room.
  let page: PDFPage = newPage(pdf);
  let y = PAGE_H - MARGIN_Y;

  const ensureSpace = (needed: number) => {
    if (y - needed < MARGIN_Y) {
      page = newPage(pdf);
      y = PAGE_H - MARGIN_Y;
    }
  };

  const draw = (
    text: string,
    x: number,
    yy: number,
    size: number,
    font: PDFFont,
    color = INK,
  ) => {
    page.drawText(text, { x, y: yy, size, font, color });
  };

  const drawRight = (
    text: string,
    rightX: number,
    yy: number,
    size: number,
    font: PDFFont,
    color = INK,
  ) => {
    const w = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: rightX - w, y: yy, size, font, color });
  };

  const drawWrapped = (
    text: string,
    x: number,
    size: number,
    font: PDFFont,
    color = INK,
    maxW = CONTENT_W,
    lineH = LINE_H_BODY,
  ) => {
    for (const line of wrap(text, font, size, maxW)) {
      ensureSpace(lineH);
      draw(line, x, y, size, font, color);
      y -= lineH;
    }
  };

  const sectionLabel = (title: string) => {
    ensureSpace(SECTION_TOP + SECTION_BOTTOM + 20);
    y -= SECTION_TOP;
    page.drawRectangle({
      x: MARGIN_X,
      y: y + 6,
      width: CONTENT_W,
      height: 0.5,
      color: RULE,
    });
    draw(title.toUpperCase().split("").join(" "), MARGIN_X, y - 8, T_SECTION, sansBold, ACCENT);
    y -= 8 + SECTION_BOTTOM;
  };

  /* ----------- Header ----------- */
  draw("Adeyi Ayomide Ephrathah", MARGIN_X, y - 4, T_NAME, serif, INK);
  y -= T_NAME + 4;

  draw(
    "Virtual Personal Assistant · Operations & Community Support",
    MARGIN_X,
    y - 8,
    T_ROLE,
    serifItalic,
    ACCENT,
  );
  y -= T_ROLE + 12;

  const contact = [
    "Nigeria · Remote",
    "European hours",
    "adeyiephrathah@gmail.com",
    "+234 815 565 8621",
    "ayoadeyi.vercel.app",
  ].join("   ·   ");
  draw(contact, MARGIN_X, y - 4, T_META, sans, MUTED);
  y -= T_META + 4;

  /* ----------- Summary ----------- */
  sectionLabel("Summary");
  drawWrapped(
    "Virtual Assistant working with founders and small teams across European hours. Runs inbox, calendar, travel, and daily operations for content brands, marketplaces, and Web3 communities. Built the content system for a launching skincare brand, handled daily correspondence for 150+ buyers at a student marketplace, and grew a volunteer community 7× in 90 days. Nursing background trains attention to detail and communication under pressure.",
    MARGIN_X,
    T_LEAD,
    sans,
    INK,
    CONTENT_W,
    14,
  );

  /* ----------- Experience ----------- */
  sectionLabel("Experience");

  const jobs = [
    {
      company: "KD Essence",
      role: "Content & Operations Support",
      dates: "2024 — Present",
      bullets: [
        "Built the content calendar for the Gourmand Collection launch — 100+ views in the first month on a brand-new account.",
        "Own daily content creation and publishing, holding a consistent brand voice across Instagram, WhatsApp, and web.",
        "Set up posting rhythm and reply templates the founder now runs without me touching them.",
      ],
    },
    {
      company: "Paladin's Hub",
      role: "Operations · Client Correspondence",
      dates: "2024",
      bullets: [
        "Handled daily communication with 150+ buyers within two weeks of launch — customers, vendors, and students all knew where their order stood.",
        "Coordinated order flow across three parties with a live status tracker and running operational notes.",
        "Kept daily operations moving without founder micromanagement.",
      ],
    },
    {
      company: "Phoenix (as Kardeeah)",
      role: "Community Manager · Web3",
      dates: "2023 — 2024",
      bullets: [
        "Grew the community from 7 to 50 active members in 90 days; ran a 500+ follower campus X account alongside.",
        "Held three roles simultaneously — Watcher, Keeper, Social Media Manager — through volatile launch periods.",
        "Wrote moderation standards other mods on the team adopted.",
      ],
    },
  ];

  for (const job of jobs) {
    // Keep role + company + first bullet together as a block.
    ensureSpace(T_JOB + T_JOB_META + LINE_H_TIGHT + 14);

    draw(job.role, MARGIN_X, y, T_JOB, sansBold, INK);
    drawRight(job.dates, PAGE_W - MARGIN_X, y, T_JOB_META, sans, MUTED);
    y -= T_JOB + 2;

    draw(job.company, MARGIN_X, y, T_JOB_META, serifItalic, ACCENT);
    y -= T_JOB_META + 6;

    for (const bullet of job.bullets) {
      const bulletLines = wrap(bullet, sans, T_BULLET, CONTENT_W - 14);
      for (let i = 0; i < bulletLines.length; i++) {
        ensureSpace(LINE_H_TIGHT);
        if (i === 0) {
          page.drawCircle({ x: MARGIN_X + 3, y: y + 3, size: 1.4, color: ACCENT });
        }
        draw(bulletLines[i], MARGIN_X + 12, y, T_BULLET, sans, INK);
        y -= LINE_H_TIGHT;
      }
    }
    y -= 3;
  }

  /* ----------- Skills ----------- */
  sectionLabel("Skills & Tools");
  const skills = [
    "Inbox & calendar management",
    "Travel coordination",
    "Client correspondence",
    "Community management",
    "Content scheduling",
    "Research & reporting",
    "Data entry & records",
    "SOP documentation",
  ];
  const tools = [
    "Google Workspace",
    "Microsoft Office",
    "Notion",
    "Airtable",
    "Slack",
    "Discord",
    "Trello",
    "Asana",
    "Calendly",
    "Canva",
    "Meta Business Suite",
  ];

  drawWrapped(skills.join("  ·  "), MARGIN_X, T_BODY, sans, INK, CONTENT_W, LINE_H_TIGHT);
  y -= 4;
  drawWrapped(tools.join("  ·  "), MARGIN_X, T_BODY - 0.5, sans, MUTED, CONTENT_W, LINE_H_TIGHT);

  /* ----------- Education & Certifications ----------- */
  sectionLabel("Education & Certifications");

  const edu = [
    {
      title: "Bachelor of Nursing Science (BNSc)",
      issuer: "University of Ilesa",
      dates: "Expected 2030",
      note: "Clinical documentation, patient communication, accuracy under pressure.",
    },
    {
      title: "ALX Virtual Assistance Certification",
      issuer: "ALX Africa",
      dates: "In Progress",
    },
    {
      title: "Customer Service & Professionalism",
      issuer: "Forage",
      dates: "June 2026",
    },
  ];

  for (const item of edu) {
    // Compact: "Title" on left with issuer inline in italic, dates right-aligned.
    ensureSpace(T_JOB + LINE_H_TIGHT);
    draw(item.title, MARGIN_X, y, T_JOB - 0.5, sansBold, INK);
    drawRight(item.dates, PAGE_W - MARGIN_X, y, T_JOB_META, sans, MUTED);
    // Issuer inline — position it after the title
    const titleW = sansBold.widthOfTextAtSize(item.title, T_JOB - 0.5);
    draw(`  ·  ${item.issuer}`, MARGIN_X + titleW, y, T_JOB_META, serifItalic, ACCENT);
    y -= LINE_H_TIGHT + 2;
    if (item.note) {
      drawWrapped(item.note, MARGIN_X, T_BODY - 1, sans, MUTED, CONTENT_W, LINE_H_TIGHT);
      y -= 2;
    }
  }

  const bytes = await pdf.save();
  writeFileSync(join(process.cwd(), "public", "Adeyi_Ayomide_VA_CV.pdf"), bytes);
  console.log(
    `✓ CV written to public/Adeyi_Ayomide_VA_CV.pdf (${(bytes.length / 1024).toFixed(1)} KB, ${pdf.getPageCount()} page${pdf.getPageCount() > 1 ? "s" : ""})`,
  );
}

/* ----------- Utilities ----------- */

function newPage(pdf: PDFDocument): PDFPage {
  const p = pdf.addPage([PAGE_W, PAGE_H]);
  p.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: BG });
  return p;
}

function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxW) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

main().catch(console.error);

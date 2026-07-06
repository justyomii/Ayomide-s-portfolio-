/**
 * Premium dark CV matching portfolio palette. Run: npm run generate-cv
 */
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFileSync } from "fs";
import { join } from "path";

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

const BG = rgb(0.04, 0.04, 0.04);
const SURFACE = rgb(0.07, 0.066, 0.062);
const TEXT = rgb(0.96, 0.96, 0.956);
const MUTED = rgb(0.61, 0.64, 0.69);
const ACCENT = rgb(0.651, 0.486, 0.365);
const ACCENT_LINE = rgb(0.651, 0.486, 0.365);

const BODY = 9.5;
const SMALL = 8.5;
const SECTION = 10;
const NAME = 22;
const SUBTITLE = 11;
const LINE = 13;
const SECTION_GAP = 18;

async function main() {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([PAGE_W, PAGE_H]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdf.embedFont(StandardFonts.HelveticaOblique);

  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: BG });

  let y = PAGE_H - MARGIN;

  const drawText = (
    text: string,
    x: number,
    size: number,
    font = regular,
    color = TEXT,
    maxW = CONTENT_W,
  ) => {
    for (const line of wrap(text, font, size, maxW)) {
      if (y < MARGIN + 24) return;
      page.drawText(line, { x, y, size, font, color });
      y -= LINE;
    }
  };

  const section = (title: string) => {
    y -= SECTION_GAP;
    page.drawRectangle({
      x: MARGIN,
      y: y - 2,
      width: 28,
      height: 1.5,
      color: ACCENT_LINE,
    });
    y -= 10;
    drawText(title, MARGIN, SECTION, bold, ACCENT);
    y -= 4;
  };

  // Header block
  page.drawRectangle({
    x: MARGIN,
    y: y - 52,
    width: CONTENT_W,
    height: 68,
    color: SURFACE,
    borderColor: rgb(0.2, 0.18, 0.16),
    borderWidth: 0.5,
  });

  page.drawText("ADEYI AYOMIDE EPHRATHAH", {
    x: MARGIN + 16,
    y: y - 8,
    size: NAME,
    font: bold,
    color: TEXT,
  });
  page.drawText("Virtual Assistant  ·  Operations & Admin Support", {
    x: MARGIN + 16,
    y: y - 30,
    size: SUBTITLE,
    font: regular,
    color: ACCENT,
  });
  page.drawText(
    "Nigeria (Remote)   +234 703 487 1669   adeyiephrathah@gmail.com   ayoadeyi.vercel.app",
    {
      x: MARGIN + 16,
      y: y - 48,
      size: SMALL,
      font: regular,
      color: MUTED,
    },
  );
  y -= 88;

  section("PROFESSIONAL SUMMARY");
  drawText(
    "Detail-oriented Virtual Assistant with a nursing science background and proven remote support experience. Built content operations for a skincare brand, managed daily correspondence for 150+ buyers at a student marketplace, and grew a volunteer community from 7 to 50 members in 90 days. ALX-certified (in progress) with Forage credentials in customer service and professionalism.",
    MARGIN,
    BODY,
    regular,
    MUTED,
  );

  section("CORE COMPETENCIES");
  const left = [
    "Inbox & calendar management",
    "Client correspondence",
    "Content scheduling",
    "Research & reporting",
  ];
  const right = [
    "Data entry & records",
    "Travel coordination",
    "Community management",
    "Attention to detail",
  ];
  const startY = y;
  left.forEach((item, i) => {
    page.drawText(`•  ${item}`, {
      x: MARGIN,
      y: startY - i * LINE,
      size: BODY,
      font: regular,
      color: TEXT,
    });
  });
  right.forEach((item, i) => {
    page.drawText(`•  ${item}`, {
      x: MARGIN + CONTENT_W / 2,
      y: startY - i * LINE,
      size: BODY,
      font: regular,
      color: TEXT,
    });
  });
  y = startY - left.length * LINE;

  section("TECHNICAL SKILLS");
  drawText(
    "Google Workspace · Microsoft Office · Notion · Trello · Asana · Slack · Canva · Meta Business Suite · Instagram · LinkedIn · X",
    MARGIN,
    BODY,
    regular,
    MUTED,
  );

  section("EXPERIENCE");

  const jobs = [
    {
      title: "KD Essence",
      role: "Content & Operations Support",
      bullets: [
        "Built content calendar for Gourmand Collection launch; 100+ views in first month on new account.",
        "Own daily content creation and publishing with consistent brand voice.",
      ],
    },
    {
      title: "Paladin's Hub",
      role: "Client Correspondence",
      bullets: [
        "Handled daily communication with 150+ buyers within two weeks of launch.",
        "Coordinated order flow and status tracking across all parties.",
      ],
    },
    {
      title: "Phoenix",
      role: "Community Manager",
      bullets: [
        "Grew membership from 7 to 50 in three months; managed 500+ follower campus X account.",
        "Served as Watcher, Keeper, and Social Media Manager as Kardeeah.",
      ],
    },
    {
      title: "Music Club",
      role: "Vice President",
      bullets: ["Coordinated logistics for 70+ members; kept rehearsals and events on schedule."],
    },
  ];

  for (const job of jobs) {
    if (y < MARGIN + 80) break;
    page.drawText(job.title, { x: MARGIN, y, size: BODY, font: bold, color: TEXT });
    page.drawText(job.role, {
      x: MARGIN + 120,
      y,
      size: SMALL,
      font: italic,
      color: ACCENT,
    });
    y -= LINE;
    for (const bullet of job.bullets) {
      for (const line of wrap(`•  ${bullet}`, regular, BODY, CONTENT_W - 12)) {
        page.drawText(line, { x: MARGIN + 8, y, size: BODY, font: regular, color: MUTED });
        y -= LINE;
      }
    }
    y -= 4;
  }

  section("EDUCATION & CERTIFICATIONS");
  drawText("Bachelor of Nursing Science (BNSc), University of Ilesa · Expected 2030", MARGIN, BODY, bold, TEXT);
  drawText("Clinical documentation, patient communication, accuracy under pressure.", MARGIN, SMALL, regular, MUTED);
  drawText("ALX Virtual Assistant Certification (In Progress)", MARGIN, BODY, regular, TEXT);
  drawText("Forage: Customer Service & Professionalism (June 2026)", MARGIN, BODY, regular, TEXT);

  const bytes = await pdf.save();
  writeFileSync(join(process.cwd(), "public", "Adeyi_Ayomide_VA_CV.pdf"), bytes);
  console.log("Premium CV generated.");
}

function wrap(
  text: string,
  font: Awaited<ReturnType<PDFDocument["embedFont"]>>,
  size: number,
  maxW: number,
) {
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

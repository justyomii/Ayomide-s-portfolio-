/**
 * Duke's Travel Pack — Luxe editorial rebuild.
 * Fraunces (display) + Space Grotesk (body).
 * Palette: warm bronze / cream / ink (Aesop / Aman / Le Labo).
 */
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Duke's Travel Pack — Paris 2026";
pres.company = "Prepared by Ephrathah Adeyi";

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

/* ----------- Palette ----------- */
const C = {
  ink: "1C1712",        // deep espresso
  inkSoft: "2B2118",    // slightly softer ink
  cream: "F4EDE1",      // warm cream
  creamSoft: "EDE4D3",  // deeper cream (cards)
  bronze: "B08757",     // warm bronze — matches portfolio
  bronzeDeep: "8B6547",
  champagne: "D9BB92",  // soft champagne
  muted: "6B5F52",
  mutedInk: "9C8A78",   // muted on dark bg
  hair: "D8CFC0",       // hairline on cream
  hairDark: "3A2E23",   // hairline on ink
};

/* ----------- Fonts ----------- */
const DISPLAY = "Fraunces";
const BODY = "Space Grotesk";

/* ----------- Helper: full-bleed background ----------- */
function bg(slide, color) {
  slide.background = { color: color };
}

/* ----------- Helper: page number + section label rail (content slides) ----------- */
function contentRail(slide, num, section) {
  slide.addText(String(num).padStart(2, "0"), {
    x: 0.55, y: 0.55, w: 0.9, h: 0.5,
    fontFace: DISPLAY,
    fontSize: 20,
    italic: true,
    color: C.bronze,
    align: "left",
    valign: "top",
    margin: 0,
  });
  slide.addText(section, {
    x: 0.55, y: 1.08, w: 4.5, h: 0.35,
    fontFace: BODY,
    fontSize: 9.5,
    bold: true,
    color: C.muted,
    charSpacing: 4,
    align: "left",
    valign: "top",
    margin: 0,
  });
  // hairline separating rail from content — subtle horizontal rule
  slide.addShape("rect", {
    x: 0.55, y: 1.55, w: 0.6, h: 0.02,
    fill: { color: C.bronze },
    line: { type: "none" },
  });
}

/* ----------- Footer on light content slides ----------- */
function contentFooter(slide) {
  slide.addText("DUKE BENSON  ·  PARIS  ·  10 – 13 JULY 2026", {
    x: 0.55, y: SLIDE_H - 0.5, w: SLIDE_W - 1.1, h: 0.3,
    fontFace: BODY,
    fontSize: 8,
    color: C.mutedInk === C.mutedInk ? "A29584" : C.muted,
    charSpacing: 3,
    align: "left",
    margin: 0,
  });
  slide.addText("Prepared by E. Adeyi", {
    x: 0.55, y: SLIDE_H - 0.5, w: SLIDE_W - 1.1, h: 0.3,
    fontFace: BODY,
    fontSize: 8,
    italic: true,
    color: "A29584",
    align: "right",
    margin: 0,
  });
}

/* ============================================================= */
/* SLIDE 1 — COVER (dark ink, editorial Paris illustration) */
/* ============================================================= */
const cover = pres.addSlide();
bg(cover, C.ink);

// Left column — text
cover.addText("PARIS  ·  2026", {
  x: 0.9, y: 0.9, w: 5.5, h: 0.4,
  fontFace: BODY, fontSize: 10, bold: true,
  color: C.champagne, charSpacing: 6,
  align: "left", margin: 0,
});

cover.addText([
  { text: "Travel", options: { fontFace: DISPLAY, fontSize: 96, color: C.cream, breakLine: true } },
  { text: "Pack.", options: { fontFace: DISPLAY, fontSize: 96, italic: true, color: C.bronze } },
], {
  x: 0.9, y: 1.7, w: 6.5, h: 2.6,
  align: "left", valign: "top", margin: 0,
});

// Hairline
cover.addShape("rect", {
  x: 0.9, y: 4.55, w: 0.7, h: 0.03,
  fill: { color: C.bronze }, line: { type: "none" },
});

cover.addText("Prepared for", {
  x: 0.9, y: 4.75, w: 5.5, h: 0.3,
  fontFace: BODY, fontSize: 10, color: C.mutedInk,
  charSpacing: 4, margin: 0, align: "left",
});
cover.addText("Duke Benson", {
  x: 0.9, y: 5.05, w: 5.5, h: 0.6,
  fontFace: DISPLAY, fontSize: 32, color: C.cream,
  margin: 0, align: "left",
});
cover.addText("Paris Leadership Conference", {
  x: 0.9, y: 5.75, w: 5.5, h: 0.35,
  fontFace: DISPLAY, italic: true, fontSize: 16, color: C.champagne,
  margin: 0, align: "left",
});
cover.addText("10 – 13 July 2026", {
  x: 0.9, y: 6.15, w: 5.5, h: 0.3,
  fontFace: BODY, fontSize: 12, color: C.mutedInk,
  margin: 0, align: "left",
});

// Right column — Paris illustration (Eiffel silhouette + Arc de Triomphe silhouette)
const illX = 8.2;
const illY = 1.2;
const illW = 4.5;
const illH = 5.8;

// Faint background panel — very subtle inset "frame"
cover.addShape("rect", {
  x: illX, y: illY, w: illW, h: illH,
  fill: { color: C.inkSoft },
  line: { color: C.hairDark, width: 0.5 },
});

// Small "postcard" label at top of illustration panel
cover.addText("A city built in bronze light", {
  x: illX + 0.3, y: illY + 0.25, w: illW - 0.6, h: 0.3,
  fontFace: DISPLAY, italic: true, fontSize: 12, color: C.champagne,
  margin: 0, align: "center",
});

// -------- Eiffel Tower (built from geometric shapes) --------
// Positioned in center of illustration panel
const eiffelCX = illX + illW / 2;
const eiffelBaseY = illY + illH - 1.4;
const eiffelHeight = 4.0;
const eiffelBaseW = 1.4;
const eiffelTopW = 0.15;

// Tapered body — approximate with a series of narrowing rectangles
const eiffelSegments = 40;
for (let i = 0; i < eiffelSegments; i++) {
  const t = i / eiffelSegments;
  const y = eiffelBaseY - (i * eiffelHeight / eiffelSegments);
  // Curved taper: sharper at bottom, gentler near top (parabolic-ish)
  const w = eiffelBaseW * Math.pow(1 - t, 1.7) + eiffelTopW * t;
  cover.addShape("rect", {
    x: eiffelCX - w / 2,
    y: y,
    w: w,
    h: eiffelHeight / eiffelSegments + 0.02,
    fill: { color: C.bronze },
    line: { type: "none" },
  });
}

// Spire on top
cover.addShape("rect", {
  x: eiffelCX - 0.015, y: eiffelBaseY - eiffelHeight - 0.35,
  w: 0.03, h: 0.4,
  fill: { color: C.bronze }, line: { type: "none" },
});

// Horizontal deck bands (Eiffel has visible platforms at ~28% and ~57% from top)
const decks = [
  { yFrac: 0.28, wMult: 0.55, h: 0.08 },
  { yFrac: 0.57, wMult: 0.75, h: 0.08 },
];
for (const d of decks) {
  const y = eiffelBaseY - eiffelHeight + eiffelHeight * d.yFrac;
  const t = d.yFrac;
  const bodyW = eiffelBaseW * Math.pow(1 - t, 1.7) + eiffelTopW * t;
  const w = bodyW * d.wMult + 0.15;
  cover.addShape("rect", {
    x: eiffelCX - w / 2, y: y - d.h / 2,
    w: w, h: d.h,
    fill: { color: C.champagne },
    line: { type: "none" },
  });
}

// Base arch — trapezoidal opening at bottom (subtract effect via cream rectangle)
cover.addShape("rect", {
  x: eiffelCX - 0.35, y: eiffelBaseY - 0.5,
  w: 0.7, h: 0.5,
  fill: { color: C.inkSoft },
  line: { type: "none" },
});

// Bottom label under Eiffel
cover.addText("Tour Eiffel  ·  1889", {
  x: illX, y: illY + illH - 0.55, w: illW, h: 0.3,
  fontFace: BODY, fontSize: 9, color: C.mutedInk,
  charSpacing: 4, align: "center", margin: 0,
});

/* ============================================================= */
/* SLIDE 2 — TRIP OVERVIEW */
/* ============================================================= */
{
  const s = pres.addSlide();
  bg(s, C.cream);
  contentRail(s, 1, "TRIP OVERVIEW");

  s.addText([
    { text: "The trip ", options: { fontFace: DISPLAY, fontSize: 56, color: C.ink } },
    { text: "at a glance.", options: { fontFace: DISPLAY, fontSize: 56, italic: true, color: C.bronze } },
  ], {
    x: 6.0, y: 0.7, w: 6.8, h: 1.8,
    align: "left", valign: "top", margin: 0,
  });

  // 2x2 detail grid
  const details = [
    { label: "CLIENT",       value: "Duke Benson" },
    { label: "DESTINATION",  value: "Paris, France" },
    { label: "DATES",        value: "10 – 13 July 2026" },
    { label: "PURPOSE",      value: "Paris Tech Leadership Conference" },
  ];

  const gridStartX = 6.0;
  const gridStartY = 3.1;
  const cellW = 3.35;
  const cellH = 1.5;
  details.forEach((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = gridStartX + col * cellW;
    const y = gridStartY + row * cellH;
    s.addText(d.label, {
      x, y, w: cellW - 0.3, h: 0.3,
      fontFace: BODY, fontSize: 9, bold: true, color: C.bronze,
      charSpacing: 4, margin: 0,
    });
    s.addText(d.value, {
      x, y: y + 0.35, w: cellW - 0.3, h: 0.7,
      fontFace: DISPLAY, fontSize: 22, color: C.ink,
      margin: 0,
    });
  });

  // Left column — italic pull quote / commitment
  s.addText([
    { text: "“", options: { fontFace: DISPLAY, fontSize: 80, color: C.bronze } },
  ], {
    x: 0.55, y: 2.3, w: 0.8, h: 1.0, margin: 0,
  });

  s.addText([
    { text: "Ready for seamless execution.", options: { fontFace: DISPLAY, italic: true, fontSize: 22, color: C.ink, breakLine: true } },
    { text: " ", options: { fontSize: 8 } },
    { text: "All key details confirmed, cross-checked, and filed before departure.", options: { fontFace: BODY, fontSize: 12, color: C.muted } },
  ], {
    x: 0.55, y: 3.4, w: 4.9, h: 3.0,
    align: "left", valign: "top", margin: 0,
  });

  contentFooter(s);
}

/* ============================================================= */
/* SLIDE 3 — ENTRY & EXIT */
/* ============================================================= */
{
  const s = pres.addSlide();
  bg(s, C.cream);
  contentRail(s, 2, "ENTRY & EXIT");

  s.addText([
    { text: "Before you ", options: { fontFace: DISPLAY, fontSize: 48, color: C.ink } },
    { text: "board.", options: { fontFace: DISPLAY, fontSize: 48, italic: true, color: C.bronze } },
  ], {
    x: 6.0, y: 0.7, w: 6.8, h: 1.4,
    align: "left", valign: "top", margin: 0,
  });

  s.addText("Four checkpoints to clear before travel day.", {
    x: 6.0, y: 1.8, w: 6.8, h: 0.4,
    fontFace: BODY, fontSize: 13, color: C.muted,
    margin: 0,
  });

  const items = [
    {
      title: "Passport validity",
      body: "Valid for at least 3 months beyond departure. At least 2 blank pages required.",
    },
    {
      title: "Visa / Schengen entry",
      body: "Check nationality-specific rules. Visa-free options for many. Conference invitation strengthens entry.",
    },
    {
      title: "Funds & proof of travel",
      body: "Show sufficient funds, return ticket, accommodation. Travel insurance covering France is essential.",
    },
    {
      title: "Customs declarations",
      body: "Declare goods over allowances. Keep business receipts. Note cash and restricted items rules.",
    },
  ];

  const listStartY = 2.5;
  const rowH = 1.0;
  items.forEach((item, i) => {
    const y = listStartY + i * rowH;
    // Number in serif italic on left
    s.addText(String(i + 1).padStart(2, "0"), {
      x: 6.0, y: y, w: 0.7, h: 0.6,
      fontFace: DISPLAY, italic: true, fontSize: 22, color: C.champagne,
      margin: 0,
    });
    s.addText(item.title, {
      x: 6.8, y: y - 0.05, w: 5.8, h: 0.35,
      fontFace: DISPLAY, fontSize: 18, color: C.ink,
      margin: 0,
    });
    s.addText(item.body, {
      x: 6.8, y: y + 0.3, w: 5.8, h: 0.6,
      fontFace: BODY, fontSize: 11, color: C.muted,
      margin: 0,
    });
    // hairline between rows
    if (i < items.length - 1) {
      s.addShape("rect", {
        x: 6.0, y: y + rowH - 0.05, w: 6.6, h: 0.008,
        fill: { color: C.hair }, line: { type: "none" },
      });
    }
  });

  // Left column — italic caution note
  s.addText([
    { text: "Always ", options: { fontFace: DISPLAY, italic: true, fontSize: 24, color: C.ink } },
    { text: "cross-check", options: { fontFace: DISPLAY, italic: true, fontSize: 24, color: C.bronze } },
    { text: " with official French sources before final travel.", options: { fontFace: DISPLAY, italic: true, fontSize: 24, color: C.ink } },
  ], {
    x: 0.55, y: 2.7, w: 4.8, h: 2.8,
    align: "left", valign: "top", margin: 0,
  });

  s.addText("france-visas.gouv.fr", {
    x: 0.55, y: 5.5, w: 4.8, h: 0.3,
    fontFace: BODY, fontSize: 11, color: C.bronze,
    margin: 0,
  });

  contentFooter(s);
}

/* ============================================================= */
/* SLIDE 4 — BUSINESS ETIQUETTE (three-column DO / DON'T / KNOW) */
/* ============================================================= */
{
  const s = pres.addSlide();
  bg(s, C.cream);
  contentRail(s, 3, "BUSINESS ETIQUETTE");

  s.addText([
    { text: "How Paris ", options: { fontFace: DISPLAY, fontSize: 42, color: C.ink } },
    { text: "works.", options: { fontFace: DISPLAY, fontSize: 42, italic: true, color: C.bronze } },
  ], {
    x: 6.0, y: 0.7, w: 6.8, h: 1.4,
    align: "left", valign: "top", margin: 0,
  });

  s.addText("The unspoken rules of French business culture.", {
    x: 6.0, y: 1.65, w: 6.8, h: 0.4,
    fontFace: BODY, fontSize: 13, color: C.muted,
    margin: 0,
  });

  // Three columns — DO / DON'T / KNOW
  const cols = [
    {
      label: "DO",
      items: [
        "Open with “Bonjour Madame / Monsieur”",
        "Dress formally — suits for men",
        "Hand cards to the receptionist first",
        "Arrive early; punctuality earns respect",
        "Debate ideas openly — it signals engagement",
      ],
    },
    {
      label: "DON'T",
      items: [
        "Lead with small talk before business",
        "Wear loud company-branded clothing",
        "Rush trust or relationship building",
        "Send urgent emails after hours",
        "Take direct feedback personally",
      ],
    },
    {
      label: "KNOW",
      items: [
        "Debate = interest, not conflict",
        "“Right to disconnect” law protects off-hours",
        "Hierarchy and titles carry weight",
        "Long lunches build relationships",
        "Polite, measured follow-ups work best",
      ],
    },
  ];

  const colStartX = 0.55;
  const colStartY = 2.3;
  const colW = 4.05;
  const colGap = 0.15;

  cols.forEach((col, ci) => {
    const x = colStartX + ci * (colW + colGap);

    s.addText(col.label, {
      x, y: colStartY, w: colW, h: 0.35,
      fontFace: BODY, fontSize: 10, bold: true, color: C.bronze,
      charSpacing: 4, margin: 0,
    });

    // hairline under label
    s.addShape("rect", {
      x, y: colStartY + 0.4, w: colW - 0.5, h: 0.01,
      fill: { color: C.hair }, line: { type: "none" },
    });

    col.items.forEach((item, ii) => {
      const y = colStartY + 0.7 + ii * 0.7;
      s.addText(String(ii + 1).padStart(2, "0"), {
        x, y, w: 0.55, h: 0.3,
        fontFace: DISPLAY, italic: true, fontSize: 13, color: C.champagne,
        margin: 0,
      });
      s.addText(item, {
        x: x + 0.5, y: y - 0.05, w: colW - 0.5, h: 0.7,
        fontFace: BODY, fontSize: 11, color: C.ink,
        margin: 0, valign: "top",
      });
    });
  });

  s.addText("Sources: Cultural Atlas  ·  Commisceo Global France Guide", {
    x: 0.55, y: SLIDE_H - 0.82, w: SLIDE_W - 1.1, h: 0.25,
    fontFace: BODY, italic: true, fontSize: 9, color: C.muted,
    margin: 0,
  });

  contentFooter(s);
}

/* ============================================================= */
/* SLIDE 5 — IMAGE GALLERY (Paris visual inspiration, extendable) */
/* ============================================================= */
{
  const s = pres.addSlide();
  bg(s, C.cream);
  contentRail(s, 4, "VISUAL INSPIRATION");

  s.addText([
    { text: "A city in ", options: { fontFace: DISPLAY, fontSize: 48, color: C.ink } },
    { text: "bronze light.", options: { fontFace: DISPLAY, fontSize: 48, italic: true, color: C.bronze } },
  ], {
    x: 0.55, y: 1.8, w: 5.2, h: 1.5,
    align: "left", valign: "top", margin: 0,
  });

  s.addText(
    "Drop Paris photography into these frames — Eiffel at dawn, Arc de Triomphe, Louvre courtyard, Seine at dusk. Right-click each frame in Google Slides → Replace image.",
    {
      x: 0.55, y: 3.35, w: 5.2, h: 3.0,
      fontFace: BODY, fontSize: 12, color: C.muted,
      margin: 0,
    }
  );

  // 2x2 grid of image placeholders
  const galleryX = 6.4;
  const galleryY = 1.35;
  const cellW = 3.05;
  const cellH = 2.0;
  const cellGap = 0.2;

  const captions = [
    "Tour Eiffel  ·  1889",
    "Arc de Triomphe  ·  Champs-Élysées",
    "Le Louvre  ·  Rue de Rivoli",
    "Seine  ·  Rive gauche",
  ];

  for (let i = 0; i < 4; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = galleryX + col * (cellW + cellGap);
    const y = galleryY + row * (cellH + cellGap + 0.35);

    // Frame with subtle inset
    s.addShape("rect", {
      x, y, w: cellW, h: cellH,
      fill: { color: C.creamSoft },
      line: { color: C.hair, width: 0.75 },
    });
    // "Add image" hint (very subtle, italic)
    s.addText("[  add image  ]", {
      x, y: y + cellH / 2 - 0.15, w: cellW, h: 0.3,
      fontFace: DISPLAY, italic: true, fontSize: 11, color: C.mutedInk,
      align: "center", margin: 0,
    });
    // Caption below
    s.addText(captions[i], {
      x, y: y + cellH + 0.05, w: cellW, h: 0.3,
      fontFace: BODY, fontSize: 9, color: C.bronze,
      charSpacing: 3, margin: 0, align: "left",
    });
  }

  contentFooter(s);
}

/* ============================================================= */
/* SLIDE 6 — TEMPLATE (blank content, duplicate to extend) */
/* ============================================================= */
{
  const s = pres.addSlide();
  bg(s, C.cream);
  contentRail(s, 5, "TEMPLATE  ·  DUPLICATE ME");

  s.addText([
    { text: "Your section ", options: { fontFace: DISPLAY, fontSize: 48, color: C.ink } },
    { text: "title.", options: { fontFace: DISPLAY, fontSize: 48, italic: true, color: C.bronze } },
  ], {
    x: 6.0, y: 0.7, w: 6.8, h: 1.4,
    align: "left", valign: "top", margin: 0,
  });

  s.addText("A short one-line lede to introduce this section.", {
    x: 6.0, y: 1.75, w: 6.8, h: 0.4,
    fontFace: BODY, italic: true, fontSize: 13, color: C.muted,
    margin: 0,
  });

  // Two content blocks — showing the pattern
  const blocks = [
    { title: "Block one", body: "A short body paragraph. Aim for two to three lines. Keep the voice measured and confident." },
    { title: "Block two", body: "A second block, same rhythm. This grid can hold three or four items comfortably." },
    { title: "Block three", body: "Duplicate any row to add more. Keep the number in italic Fraunces bronze for consistency." },
  ];

  blocks.forEach((b, i) => {
    const y = 2.6 + i * 1.15;
    s.addText(String(i + 1).padStart(2, "0"), {
      x: 6.0, y, w: 0.65, h: 0.5,
      fontFace: DISPLAY, italic: true, fontSize: 20, color: C.champagne,
      margin: 0,
    });
    s.addText(b.title, {
      x: 6.75, y: y - 0.05, w: 5.8, h: 0.35,
      fontFace: DISPLAY, fontSize: 18, color: C.ink, margin: 0,
    });
    s.addText(b.body, {
      x: 6.75, y: y + 0.32, w: 5.8, h: 0.7,
      fontFace: BODY, fontSize: 11, color: C.muted, margin: 0,
    });
    if (i < blocks.length - 1) {
      s.addShape("rect", {
        x: 6.0, y: y + 1.05, w: 6.6, h: 0.008,
        fill: { color: C.hair }, line: { type: "none" },
      });
    }
  });

  // Left column — instructions to Ayomide
  s.addText("HOW TO EXTEND", {
    x: 0.55, y: 2.3, w: 4.8, h: 0.35,
    fontFace: BODY, fontSize: 9, bold: true, color: C.bronze,
    charSpacing: 4, margin: 0,
  });

  s.addText([
    { text: "Right-click this slide in Google Slides", options: { fontFace: BODY, fontSize: 12, color: C.ink, breakLine: true } },
    { text: "→ Duplicate slide", options: { fontFace: BODY, italic: true, fontSize: 12, color: C.muted, breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "Swap the title, rewrite the blocks, keep the numbered rhythm.", options: { fontFace: BODY, fontSize: 12, color: C.ink, breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "Fonts", options: { fontFace: DISPLAY, italic: true, fontSize: 14, color: C.bronze, breakLine: true } },
    { text: "Fraunces (display) + Space Grotesk (body)", options: { fontFace: BODY, fontSize: 11, color: C.muted, breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "Colours", options: { fontFace: DISPLAY, italic: true, fontSize: 14, color: C.bronze, breakLine: true } },
    { text: "#1C1712 ink  ·  #F4EDE1 cream  ·  #B08757 bronze", options: { fontFace: BODY, fontSize: 11, color: C.muted } },
  ], {
    x: 0.55, y: 2.75, w: 4.9, h: 4.2,
    align: "left", valign: "top", margin: 0,
  });

  contentFooter(s);
}

/* ============================================================= */
/* SLIDE 7 — CLOSING (dark ink, editorial close) */
/* ============================================================= */
{
  const s = pres.addSlide();
  bg(s, C.ink);

  // Small label top
  s.addText("PARIS  ·  2026", {
    x: 0.9, y: 0.7, w: 6, h: 0.4,
    fontFace: BODY, fontSize: 10, bold: true, color: C.champagne,
    charSpacing: 6, margin: 0,
  });

  // Centered big serif line
  s.addText([
    { text: "Ready for ", options: { fontFace: DISPLAY, fontSize: 90, color: C.cream } },
    { text: "Paris.", options: { fontFace: DISPLAY, fontSize: 90, italic: true, color: C.bronze } },
  ], {
    x: 0.9, y: 2.4, w: 11.5, h: 1.6,
    align: "center", valign: "middle", margin: 0,
  });

  // Sub line
  s.addText("This pack is built for professional impact and smooth execution.", {
    x: 1.0, y: 4.4, w: 11.3, h: 0.5,
    fontFace: DISPLAY, italic: true, fontSize: 20, color: C.champagne,
    align: "center", margin: 0,
  });

  // Signature line
  s.addText("Safe travels, Duke.  Deliver excellence.", {
    x: 1.0, y: 5.1, w: 11.3, h: 0.4,
    fontFace: BODY, fontSize: 13, color: C.mutedInk,
    align: "center", margin: 0,
  });

  // Bottom hairline + credit
  s.addShape("rect", {
    x: SLIDE_W / 2 - 0.35, y: SLIDE_H - 1.05, w: 0.7, h: 0.03,
    fill: { color: C.bronze }, line: { type: "none" },
  });
  s.addText("Prepared by Ephrathah Adeyi", {
    x: 0.9, y: SLIDE_H - 0.7, w: SLIDE_W - 1.8, h: 0.3,
    fontFace: BODY, italic: true, fontSize: 10, color: C.mutedInk,
    align: "center", charSpacing: 2, margin: 0,
  });
  s.addText("INTERNATIONAL STANDARD  ·  JULY 2026", {
    x: 0.9, y: SLIDE_H - 0.4, w: SLIDE_W - 1.8, h: 0.3,
    fontFace: BODY, fontSize: 8, color: C.champagne,
    align: "center", charSpacing: 5, margin: 0,
  });
}

/* ============================================================= */
/* WRITE */
/* ============================================================= */
pres.writeFile({ fileName: "/Users/mac/Downloads/Dukes_Travel_Pack_Luxe.pptx" })
  .then((f) => console.log("✓ Wrote", f));

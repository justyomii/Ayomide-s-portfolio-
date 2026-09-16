import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Kachi and Yomi — seven months";
export const ogContentType = "image/png";

// Keep this in sync with the page's startDate.
const START = new Date("2026-02-16").getTime();

export async function buildAnniversaryOg() {
  const [lora, loraItalic, photo] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Lora.woff")),
    readFile(join(process.cwd(), "public/fonts/Lora-Italic.woff")),
    readFile(join(process.cwd(), "public/anniversary/photo-1.jpg")),
  ]);

  const days = Math.max(0, Math.floor((Date.now() - START) / 86_400_000));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "Lora",
          backgroundColor: "#170d05",
          backgroundImage: "linear-gradient(125deg, #33210f 0%, #1c1207 55%, #140b05 100%)",
        }}
      >
        {/* Left: words */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            width: 690,
          }}
        >
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 10, color: "#cf9f6c" }}>
            KACHI  ×  YOMI
          </div>
          <div style={{ display: "flex", fontSize: 104, color: "#f3ddb7", marginTop: 6 }}>Kayomi</div>
          <div style={{ display: "flex", width: 96, height: 3, backgroundColor: "#b07b45", marginTop: 30, marginBottom: 30 }} />
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div style={{ display: "flex", fontSize: 112, fontStyle: "italic", color: "#e9cc9f" }}>{days}</div>
            <div style={{ display: "flex", fontSize: 46, fontStyle: "italic", color: "#e9cc9f", marginLeft: 18, marginBottom: 16 }}>days</div>
          </div>
          <div style={{ display: "flex", fontSize: 27, color: "#a98d6d", marginTop: 10 }}>
            and counting · seven months together
          </div>
        </div>

        {/* Right: the two of them, as a polaroid */}
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f6f1e6",
              padding: 18,
              paddingBottom: 26,
              transform: "rotate(-4deg)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.55)",
            }}
          >
            <img src={photoSrc} width={352} height={432} style={{ objectFit: "cover" }} />
            <div style={{ display: "flex", justifyContent: "center", marginTop: 14, fontSize: 24, fontStyle: "italic", color: "#8a5138" }}>
              us
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Lora", data: lora, style: "normal", weight: 400 },
        { name: "Lora", data: loraItalic, style: "italic", weight: 400 },
      ],
    },
  );
}

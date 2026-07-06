import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/content";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageAlt = `${site.name} | ${site.title}`;

export async function buildOgImage() {
  const profileBuffer = await readFile(join(process.cwd(), "public/images/profile.jpg"));
  const profileSrc = `data:image/jpeg;base64,${profileBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 6,
            height: "100%",
            background: "#a67c5d",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px 80px",
            width: "62%",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 22,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#a67c5d",
            }}
          >
            {site.tagline}
          </p>
          <h1
            style={{
              margin: "20px 0 0",
              fontSize: 64,
              lineHeight: 1.05,
              color: "#f5f5f4",
              fontFamily: "Georgia, serif",
              fontWeight: 400,
            }}
          >
            {site.name}
          </h1>
          <p
            style={{
              margin: "24px 0 0",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#b8bcc4",
            }}
          >
            {site.title} · {site.subtitle}
          </p>
          <p
            style={{
              margin: "36px 0 0",
              fontSize: 22,
              color: "#7d8490",
            }}
          >
            ayoadeyi.vercel.app
          </p>
        </div>

        <div
          style={{
            position: "relative",
            width: "38%",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #0a0a0a 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0) 70%)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileSrc}
            alt=""
            style={{
              height: "108%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}

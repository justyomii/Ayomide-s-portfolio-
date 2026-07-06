import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/emailjs";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/validations/contact";

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 15 * 60 * 1000;

const contactApiSchema = contactFormSchema.extend({
  website: z.string().optional(),
});

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactApiSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const { website, ...data } = parsed.data;

  if (website?.trim()) {
    return NextResponse.json({ success: true });
  }

  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);

  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: `Too many messages sent. Please wait ${rateCheck.retryAfterSeconds} seconds and try again.`,
      },
      { status: 429 },
    );
  }

  const result = await sendContactEmail(data);

  if (result.reason === "not_configured") {
    return NextResponse.json(
      {
        error:
          "Contact form env vars are missing on the server. Add EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY in Vercel (Production), then redeploy.",
      },
      { status: 503 },
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      {
        error:
          "Could not send your message. Check EmailJS template variables and private key, then try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}

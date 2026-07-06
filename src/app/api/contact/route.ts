import { NextResponse } from "next/server";
import { z } from "zod";
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

async function sendViaEmailJS(params: {
  name: string;
  email: string;
  service: string;
  message: string;
}) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      ...(privateKey ? { accessToken: privateKey } : {}),
      template_params: {
        from_name: params.name,
        from_email: params.email,
        service: params.service,
        message: params.message,
        reply_to: params.email,
      },
    }),
  });

  if (!response.ok) {
    return { ok: false as const, reason: "send_failed" as const };
  }

  return { ok: true as const };
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

  const result = await sendViaEmailJS(data);

  if (result.reason === "not_configured") {
    return NextResponse.json(
      { error: "Contact form is not configured yet. Please email directly." },
      { status: 503 },
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      { error: "Could not send your message. Please try again or email directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}

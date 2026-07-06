type EmailJSConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey?: string;
};

function readEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

export function getEmailJSConfig(): EmailJSConfig | null {
  const serviceId = readEnv("EMAILJS_SERVICE_ID", "NEXT_PUBLIC_EMAILJS_SERVICE_ID");
  const templateId = readEnv("EMAILJS_TEMPLATE_ID", "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
  const publicKey = readEnv("EMAILJS_PUBLIC_KEY", "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
  const privateKey = readEnv("EMAILJS_PRIVATE_KEY", "NEXT_PUBLIC_EMAILJS_PRIVATE_KEY");

  if (!serviceId || !templateId || !publicKey) {
    const missing = [
      !serviceId ? "EMAILJS_SERVICE_ID" : null,
      !templateId ? "EMAILJS_TEMPLATE_ID" : null,
      !publicKey ? "EMAILJS_PUBLIC_KEY" : null,
    ].filter(Boolean);

    console.error("[contact] EmailJS env missing:", missing.join(", "));
    return null;
  }

  return { serviceId, templateId, publicKey, privateKey };
}

export async function sendContactEmail(params: {
  name: string;
  email: string;
  service: string;
  message: string;
}) {
  const config = getEmailJSConfig();
  if (!config) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.publicKey,
      ...(config.privateKey ? { accessToken: config.privateKey } : {}),
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
    const detail = await response.text().catch(() => "");
    console.error("[contact] EmailJS send failed:", response.status, detail);
    return { ok: false as const, reason: "send_failed" as const };
  }

  return { ok: true as const };
}

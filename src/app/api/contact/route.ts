import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * [[NEEDS CLIENT INPUT: production email endpoint / form backend]]
 * This is a stub: it validates and sanitises input server-side (independent of
 * the client), then returns success WITHOUT delivering the message anywhere.
 * Wire up a real transport (SMTP, Resend, Formspree, etc.) before launch.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = {
  name: 120,
  company: 160,
  email: 160,
  phone: 40,
  subject: 160,
  message: 4000,
};

/** Remove control chars, neutralise angle brackets, collapse whitespace. */
function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  let out = "";
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    if (code === 9 || code === 10 || code === 13) out += " ";
    else if (code < 32 || code === 127) continue;
    else if (ch === "<" || ch === ">") continue;
    else out += ch;
  }
  return out.replace(/\s+/g, " ").trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const data = {
    name: clean(body.name, MAX.name),
    company: clean(body.company, MAX.company),
    email: clean(body.email, MAX.email),
    phone: clean(body.phone, MAX.phone),
    subject: clean(body.subject, MAX.subject),
    message: clean(body.message, MAX.message),
  };

  // Server-side validation, independent of the client.
  if (!data.name || !data.email || !data.subject || !data.message) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 422 }
    );
  }
  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 422 }
    );
  }

  // TODO(client): deliver `data` to the real destination inbox here.
  // Intentionally not logging PII to stdout in this stub.

  return NextResponse.json({ ok: true });
}

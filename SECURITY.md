# Security Hardening (Phase 11)

## Response headers (`next.config.ts`)
Applied to `/:path*`:

| Header | Value | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Force HTTPS (HSTS) |
| `Content-Security-Policy` | `default-src 'self'`; scoped script/style/img/font/connect; `frame-ancestors 'self'`; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'` | Mitigate XSS / clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `SAMEORIGIN` | Legacy clickjacking guard (CSP frame-ancestors is primary) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` | Disable unused APIs |

> **HTTPS/HSTS note:** `Strict-Transport-Security` only takes effect over HTTPS.
> Terminate TLS at the host/CDN (Vercel/N ginx) — HSTS is a no-op on plain HTTP.

## Input handling
- **Server-side sanitisation** in `/api/contact` (`clean()`): strips control
  characters, removes angle brackets, collapses whitespace, clamps field length.
- **Server-side validation independent of the client**: required-field and email
  checks run again on the server; the client cannot bypass them.
- Contact endpoint does not log PII in the stub.

## CSRF / XSS posture
- **XSS:** no `dangerouslySetInnerHTML` on user input; the only use is for
  first-party JSON-LD built from trusted constants. React escapes all rendered
  content by default. CSP further constrains injected scripts.
- **CSRF:** the only state-changing endpoint is `/api/contact`, which currently
  performs no privileged/persistent action (stub). **When a real backend is
  wired up**, add CSRF protection appropriate to it — e.g. an origin/Referer
  allow-list check, a same-site token, or a provider (Resend/Formspree) that
  authenticates server-side with a secret key never exposed to the client.

## To finalise before launch (client/ops)
- [ ] Wire the real form transport and re-add `script-src` nonces (drop
      `'unsafe-inline'`/`'unsafe-eval'` once inline bootstrap is nonce-based).
- [ ] Confirm TLS + HSTS at the hosting layer; consider HSTS preload submission.
- [ ] Add rate limiting to `/api/contact` (host/WAF or middleware) to deter spam.
- [ ] Re-test CSP against any analytics or map embed added later.

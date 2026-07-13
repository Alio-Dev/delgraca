import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BLUE = "#0047CA";
const ORANGE = "#FF6600";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 22 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ width: 18, height: 56, background: ORANGE, borderRadius: 3 }} />
            <div style={{ width: 18, height: 78, background: ORANGE, borderRadius: 3 }} />
            <div style={{ width: 18, height: 104, background: ORANGE, borderRadius: 3 }} />
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: BLUE,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            DELGRAÇA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 96,
              height: 8,
              background: ORANGE,
              borderRadius: 4,
              marginBottom: 28,
            }}
          />
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "#10192E",
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            {t("defaultTitle")}
          </div>
          <div style={{ fontSize: 26, color: "#47506A", marginTop: 20 }}>
            {t("tagline")}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

import type { NextConfig } from "next";

// Toutes les polices sont auto-hébergées (next/font) et toutes les images/
// vidéos servies depuis notre propre domaine — plus aucune ressource externe
// à charger, donc une politique stricte "tout vient d'ici" ne casse rien.
// 'unsafe-inline' reste nécessaire pour le script JSON-LD (schema.org) et les
// quelques styles inline du site ; ça reste un vrai gain : ça bloque toute
// tentative de charger un script/style/image/police depuis un domaine
// étranger (ex. si une dépendance était un jour compromise).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;

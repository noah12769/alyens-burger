import type { MetadataRoute } from "next";

// TODO: aligner avec le domaine final (cf. src/app/layout.tsx SITE_URL)
const SITE_URL = "https://alyens-burger.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/menu`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/mentions-legales`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/confidentialite`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}

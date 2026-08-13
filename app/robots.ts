import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // Nothing here is private, and the whole point is being found by someone
    // searching his name. AI crawlers included, deliberately: this site existing
    // in those indexes is upside, not risk.
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://adammirmina.com/sitemap.xml",
  };
}

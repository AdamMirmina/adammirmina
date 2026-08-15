import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

/* The inverse of the usual portfolio pairing: sans for display, serif for
   reading. Archivo is a sturdy grotesque with no trend attached to it, and
   Newsreader handles long paragraphs far better than a UI sans while carrying
   the warmth the paper ground wants. The first build used Instrument Serif and
   Inter, which together are the default look of the category. */
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const body = Newsreader({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adammirmina.com"),
  title: {
    default: "Adam Mirmina",
    template: "%s · Adam Mirmina",
  },
  // Drawn from site.thesis rather than retyped. Three hardcoded copies of the
  // tagline lived here and all three survived a tagline change, so the page said
  // one thing and every link preview and search result said the older one. The
  // page is the only place the string should exist.
  description: `${site.thesis} ${site.role}.`,
  openGraph: {
    title: "Adam Mirmina",
    description: site.thesis,
    url: "https://adammirmina.com",
    siteName: "Adam Mirmina",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Adam Mirmina" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Mirmina",
    description: site.thesis,
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ec",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body>
        {children}
        {/* Structured data, so a search result for his name resolves to a person
            rather than to a string. Small file, real payoff. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Adam Mirmina",
              url: "https://adammirmina.com",
              email: "mailto:amirmina@purdue.edu",
              jobTitle: "Founder and Engineer",
              affiliation: [
                { "@type": "CollegeOrUniversity", name: "Purdue University" },
                { "@type": "Organization", name: "Ramsgate Studio", url: "https://ramsgatestudio.com" },
              ],
              sameAs: [
                "https://github.com/AdamMirmina",
                "https://linkedin.com/in/adam-mirmina",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}

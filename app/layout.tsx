import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

/* Instrument Serif for display, Inter for reading. The pairing is the reason the
   page reads as editorial rather than as a developer template, and it costs two
   font files because Instrument Serif is only ever used at large sizes. */
const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adammirmina.com"),
  title: {
    default: "Adam Mirmina",
    template: "%s · Adam Mirmina",
  },
  description:
    "I build software for problems I can point at, usually because someone I know had one. Data science and cognitive science at Purdue, cardiovascular imaging research, and Ramsgate Studio.",
  openGraph: {
    title: "Adam Mirmina",
    description:
      "I build software for problems I can point at, usually because someone I know had one.",
    url: "https://adammirmina.com",
    siteName: "Adam Mirmina",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Adam Mirmina" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Mirmina",
    description:
      "I build software for problems I can point at, usually because someone I know had one.",
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} antialiased`}>
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

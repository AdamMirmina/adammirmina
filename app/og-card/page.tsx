import type { Metadata } from "next";
import { site } from "@/lib/content";

/* The link preview, as a real page.
 *
 * Rendering the OG image from the live page rather than from a hand-built SVG
 * means it can only ever be in the site's actual typefaces. Two attempts at the
 * SVG route failed on font plumbing alone: sharp resolves font-family through
 * the OS font database and silently falls back to a generic sans, and the
 * Google Fonts API hands back something that is not truetype no matter what
 * user agent asks. Screenshotting the thing itself removes the whole class of
 * problem, and the preview can never drift from the design.
 *
 * scripts/gen-og.mjs captures this at exactly 1200x630. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function OgCard() {
  return (
    <div className="flex h-[630px] w-[1200px] flex-col justify-center bg-ground px-20">
      <p className="mb-7 text-sm uppercase tracking-[0.2em] text-ink-faint">{site.role}</p>
      <h1 className="font-display text-[7.5rem] leading-none tracking-tight">Adam Mirmina</h1>
      <p className="mt-10 max-w-3xl text-[2rem] leading-snug text-ink-dim">{site.thesis}</p>
      <div className="mt-12 h-px w-28 bg-ink-faint" />
    </div>
  );
}

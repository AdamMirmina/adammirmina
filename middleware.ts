import { NextResponse, type NextRequest } from "next/server";

/**
 * Forces http to https. This is a hard launch gate on every site here: a visitor
 * must never see "Not secure", and on a phone that warning sits right next to the
 * URL and reads as "do not trust this" before a word of the page is read.
 *
 * It is done in code rather than with Cloudflare's edge toggle so it is version
 * controlled and ships on push. The stored wrangler OAuth token cannot flip zone
 * settings anyway.
 *
 * Behind Cloudflare the original scheme arrives in x-forwarded-proto, with
 * cf-visitor as the fallback. localhost is skipped so `next dev` still works.
 */
export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return NextResponse.next();

  // One canonical hostname. Two hostnames serving identical content splits
  // search ranking between them and makes every shared link ambiguous, so www
  // folds onto the apex with a 301 before the scheme check runs. Combined rather
  // than chained: a www + http request should not take two round trips.
  if (url.hostname === "www.adammirmina.com") {
    url.hostname = "adammirmina.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  const forwarded = request.headers.get("x-forwarded-proto");
  let scheme = forwarded?.split(",")[0]?.trim();
  if (!scheme) {
    try {
      scheme = JSON.parse(request.headers.get("cf-visitor") || "{}").scheme;
    } catch {}
  }

  if (scheme === "http") {
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  // Static assets are served before the worker runs, so excluding them costs
  // nothing. HSTS makes the browser upgrade them on its own after the first
  // https response anyway.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

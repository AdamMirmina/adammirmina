// The Worker entry. Wraps the one OpenNext generates so that every path the
// site does not own is answered by the `share` Worker over a service binding.
//
// Adam, 2026-09-18: "put everything that's on share.adammirmina just on
// adammirmina.com/x. if it's an interactive app rather than page, put it on
// x.adammirmina." So adammirmina.com/<slug> is a share page now, served by
// that Worker with this hostname on the request (it renders canonical URLs
// and footers from it); an app is its own subdomain, which share owns too.
//
// Static assets never reach this file (the assets binding answers them
// first). What arrives is the site's own routes, listed in OWN, and anything
// else, which goes to share; a 404 from share falls back to the site's own
// not-found page, so an unknown path still looks like this site.

import next from "./.open-next/worker.js";
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";

const APEX = "adammirmina.com";

// Every route Next builds here (app-paths-manifest.json), plus its own
// runtime paths. A new page or route handler in app/ is a line here too.
const OWN = new Set(["/", "/og-card", "/robots.txt", "/sitemap.xml", "/favicon.ico", "/icon.png", "/apple-icon.png"]);
const ownPrefix = (p) => p.startsWith("/_next/") || p.startsWith("/cdn-cgi/") || p.startsWith("/og-card/");

function scheme(request, url) {
  const forwarded = request.headers.get("x-forwarded-proto");
  const s = forwarded && forwarded.split(",")[0].trim();
  if (s) return s;
  try { return JSON.parse(request.headers.get("cf-visitor") || "{}").scheme || url.protocol.replace(":", ""); } catch { return url.protocol.replace(":", ""); }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (local || OWN.has(path) || ownPrefix(path) || !env.SHARE) return next.fetch(request, env, ctx);

    // The same two redirects middleware.ts does for the site's own paths, so a
    // share page reached as www or http lands on one canonical address.
    if (url.hostname === `www.${APEX}` || scheme(request, url) === "http") {
      url.hostname = APEX;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    const shared = await env.SHARE.fetch(request);
    if (shared.status === 404) return next.fetch(request, env, ctx);
    const h = new Headers(shared.headers);
    h.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    return new Response(shared.body, { status: shared.status, statusText: shared.statusText, headers: h });
  },
};

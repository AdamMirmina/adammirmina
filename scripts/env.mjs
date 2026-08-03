// Credentials from .env, so they never have to be typed, pasted into a chat, or
// left in shell history. Synced from the handbook: edit kit/env.mjs there.
//
// Environment variables win, so containers and CI keep working unchanged.
import fs from "fs";
import path from "path";

export function loadEnv(dir = process.cwd()) {
  const f = path.join(dir, ".env");
  if (!fs.existsSync(f)) return {};
  const out = {};
  for (const raw of fs.readFileSync(f, "utf8").split("\n")) {
    const t = raw.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    let v = t.slice(i + 1).trim();
    const q = String.fromCharCode(34), a = String.fromCharCode(39);
    if ((v.startsWith(q) && v.endsWith(q)) || (v.startsWith(a) && v.endsWith(a))) {
      v = v.slice(1, -1);
    }
    out[t.slice(0, i).trim()] = v;
  }
  return out;
}

// Put .env into process.env without disturbing anything already set there, so a
// script that reads process.env directly keeps working with no edit beyond
// importing this. Anything already in the environment still wins, which is what
// keeps containers and CI behaving exactly as they did before.
export function hydrate(dir = process.cwd()) {
  const e = loadEnv(dir);
  for (const [k, v] of Object.entries(e)) {
    if (v && !process.env[k]) process.env[k] = v;
  }
  return e;
}

// Fetch required names, failing with a useful message rather than a stack trace.
export function need(...names) {
  const e = loadEnv();
  const out = {};
  const missing = [];
  for (const n of names) {
    const v = process.env[n] || e[n];
    if (!v) missing.push(n);
    out[n] = v;
  }
  if (missing.length) {
    console.error("Missing credentials: " + missing.join(", "));
    console.error("Copy .env.example to .env and fill it in, or set them in the");
    console.error("environment. See docs/CREDENTIALS.md.");
    process.exit(1);
  }
  return out;
}

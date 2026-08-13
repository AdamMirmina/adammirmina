"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const NAV = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "studio", label: "Studio" },
  { id: "music", label: "Music" },
  { id: "contact", label: "Contact" },
];

/**
 * Top bar. Hidden over the hero and revealed once you have scrolled past it, so
 * the first screen is only the name and nothing competes with it.
 *
 * The active link is marked with an underline rather than a filled pill. A
 * rounded solid-background active state is the most recognisable component-kit
 * default there is, and this site is arguing that it was made by hand.
 */
export function TopBar() {
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length || typeof IntersectionObserver === "undefined") return;
    // A band across the upper third: whichever section is crossing it owns the
    // highlight. Watching scrollY against offsets directly gets fiddly the
    // moment sections differ in height, which they do.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[opacity,transform] duration-500 ${
        shown ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="border-b border-rule bg-ground/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          {/* nowrap: at 390px "Adam Mirmina" broke over two lines and made the
              whole bar taller. The nav beside it scrolls, so it can give up the
              width instead. */}
          <a href="#top" className="shrink-0 whitespace-nowrap font-display text-lg leading-none">
            {site.name}
          </a>
          {/* Scrolls sideways on a phone rather than collapsing into a
              hamburger. Five short words fit, and a menu that needs opening to
              tell you what is in it is worse than one you can flick. */}
          <ul className="-mx-2 flex gap-5 overflow-x-auto px-2 sm:mx-0 sm:gap-7 sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`whitespace-nowrap border-b pb-0.5 text-sm transition-colors ${
                    active === n.id
                      ? "border-ink text-ink"
                      : "border-transparent text-ink-dim hover:text-ink"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

/** Arms the scroll reveals. Kept out of the server components so the page is
    fully rendered HTML and this only enhances it. */
export function Reveals() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const show = (el: Element) => {
      el.classList.add("is-in");
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            continue;
          }
          // Not intersecting can mean "not yet" or "already gone past", and only
          // the first should stay hidden. Anything now ABOVE the viewport has to
          // be revealed here or it never will be: it will not cross the boundary
          // a second time. This is not theoretical. Landing on /#music jumps most
          // of the page in one smooth scroll, and elements travelling that fast
          // can pass between observer samples entirely.
          const rootTop = e.rootBounds?.top ?? 0;
          if (e.boundingClientRect.bottom < rootTop) show(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    // Only arm what is genuinely below the fold. Arming everything and waiting
    // for an intersection strands anything that is already on screen or already
    // scrolled past: it was hidden, it never crosses the boundary again, and it
    // stays invisible forever. That happens for real whenever someone opens a
    // deep link like /#work, or restores a scrolled tab.
    //
    // Armed only here, in JS, so with scripting off the CSS leaves the whole page
    // visible rather than blank.
    for (const el of els) {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
        el.classList.add("is-armed");
        io.observe(el);
      }
    }

    // Settle pass. The observer deliberately ignores the bottom 12% of the
    // viewport so things reveal a beat before you reach them, and that leaves a
    // dead zone: after a hash jump, whatever is parked in that band stays hidden
    // and nothing moves it until the user scrolls.
    //
    // It runs on a short repeat rather than once, because a single timer has to
    // guess when the smooth scroll finished. A jump to the bottom of a 10,000px
    // page is still travelling at 700ms, so a one-shot check measures the wrong
    // positions and leaves exactly one block stranded. Stops as soon as nothing
    // is left, and gives up after three seconds either way.
    const sweep = () => {
      let remaining = 0;
      for (const el of els) {
        if (!el.classList.contains("is-armed") || el.classList.contains("is-in")) continue;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) show(el);
        else remaining++;
      }
      return remaining;
    };

    let ticks = 0;
    const settle = window.setInterval(() => {
      if (sweep() === 0 || ++ticks > 12) window.clearInterval(settle);
    }, 250);

    return () => {
      window.clearInterval(settle);
      io.disconnect();
    };
  }, []);

  return null;
}

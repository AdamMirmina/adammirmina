import { site } from "@/lib/content";

/*
  One screen. That is the whole site now.

  Adam, 2026-08-14: "take my site down. i can't articulate a good reason to do
  this rn and i don't think it's worth the effort at this time" and, in the same
  breath, "i will be updating my linkedin so i can showcase projects there."

  Do not record that the full version was "nearly done and only needed photos".
  That was this session's guess and Adam corrected it: "not true. i would want a
  ton of adjustments. i'm not okay with how it is at the moment." So the portfolio
  version needed real design work on top of the eight missing photographs, which
  is a far larger job than it looked from inside the build.

  Nothing linked to it either: his resume names LinkedIn and GitHub and never the
  domain. So it was soliciting search traffic it could not serve while the surface
  recruiters actually search sat un-updated. LinkedIn is the showcase.

  This is deliberately NOT a placeholder, a "coming soon", or an under
  construction notice. Those all promise a later version and then age badly when
  it never arrives. It is a finished card: who he is, how to reach him, where the
  work lives. Nothing here needs upkeep, which is the point, and the previous
  version is in git if it is ever wanted.
*/

const links = [
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
  { label: "Ramsgate Studio", href: site.links.studio },
];

export default function Home() {
  return (
    <main className="flex min-h-[100svh] flex-col justify-center px-6 py-16 sm:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <p className="mb-7 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-spot">
          {site.role}
        </p>

        {/* Clamped rather than stepped through breakpoints, so it fills the
            measure on a phone and on a wide display without a stack of rules. */}
        <h1 className="font-display font-bold leading-[0.9] tracking-[-0.03em] [font-size:clamp(2.75rem,10vw,5.5rem)]">
          Adam
          <br />
          Mirmina
        </h1>

        <hr className="mt-10 mb-9 w-16 border-0 border-t border-spot" />

        <p className="max-w-lg text-lg leading-relaxed text-ink-2 sm:text-xl">
          {site.thesis}
        </p>

        {/* The email is the largest interactive thing on the page, because it is
            the action worth taking here. The phone sits under it at body size
            rather than beside it: two contact methods at equal weight makes
            neither one the obvious move. */}
        <a
          href={`mailto:${site.email}`}
          className="mt-10 inline-block font-display font-semibold leading-none tracking-[-0.02em] transition-colors hover:text-spot [font-size:clamp(1.15rem,3.5vw,1.6rem)]"
        >
          {site.email}
        </a>
        <p className="mt-3">
          <a
            href={`tel:${site.phone.tel}`}
            className="text-base text-ink-2 transition-colors hover:text-spot"
          >
            {site.phone.display}
          </a>
        </p>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-7">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-baseline gap-1.5 text-sm text-ink transition-colors hover:text-ink-2"
              >
                <span className="border-b border-ink-3 pb-px transition-colors group-hover:border-spot">
                  {l.label}
                </span>
                <span aria-hidden className="translate-y-px text-[0.65rem]">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs text-ink-3">
          West Lafayette, Indiana and Cherry Hill, New Jersey
        </p>
      </div>
    </main>
  );
}

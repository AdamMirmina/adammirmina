import { site } from "@/lib/content";

/*
  One screen. That is the whole site now.

  Adam, 2026-08-14: "take my site down" and, in the same breath, "i will be
  updating my linkedin so i can showcase projects there." One decision. Nothing
  linked here anyway: his resume names LinkedIn and GitHub and never the domain,
  so the page was soliciting search traffic while the surface recruiters actually
  search sat un-updated.

  Do not record that the portfolio version was "nearly done and only needed
  photos". That was a guess and Adam corrected it: "not true. i would want a ton
  of adjustments. i'm not okay with how it is at the moment."

  This is deliberately NOT a placeholder or a "coming soon". Those promise a
  later version and age badly when it never arrives. It is a finished card, and
  the portfolio version is in git if it is ever wanted.

  LAYOUT, and this is the part that was wrong first time round. The card began as
  one narrow centred column, which is a phone layout with more whitespace around
  it. Adam: "it also looks like it was rendered on phone despite being on
  desktop... needs a nice looking desktop view."

  So the page is built as a full-bleed sheet rather than a column. It pins the
  eyebrow to the top and the location to the bottom with justify-between, so the
  viewport height is used rather than floated through, and it splits into two
  columns at lg: the name and the line on the left, everything actionable in a
  right rail sitting on the same baseline. On a phone that grid collapses to one
  column in source order and the design reads the same, which is the direction
  that actually works. Wide first would have meant fighting the stack.
*/

const links = [
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
  { label: "Ramsgate Studio", href: site.links.studio },
];

export default function Home() {
  return (
    <main className="flex min-h-[100svh] flex-col justify-between gap-16 px-7 py-10 sm:px-10 lg:px-16 lg:py-14">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-spot">
        {site.role}
      </p>

      {/* items-end puts the right rail on the same optical baseline as the
          tagline, so the two columns read as one block rather than two things
          that happen to sit side by side. */}
      {/* The rail is a fixed width rather than a fraction. As 1fr it was a
          500px column holding 300px of content, so its divider and its rule both
          overshot the links and the block read as unfinished. */}
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end lg:gap-20">
        <div>
          {/* Clamped hard so it genuinely fills a wide screen. The old ceiling
              was 5.5rem, which is what made 1440px look like a blown-up phone. */}
          <h1 className="font-display font-bold leading-[0.85] tracking-[-0.035em] [font-size:clamp(3.25rem,11vw,9.5rem)]">
            Adam
            <br />
            Mirmina
          </h1>

          <hr className="mt-9 mb-8 w-20 border-0 border-t-2 border-spot" />

          <p className="max-w-md text-lg leading-relaxed text-ink-2 sm:text-xl">
            {site.thesis}
          </p>
        </div>

        {/* Everything a visitor could act on, in one place. The email is the
            largest of them because it is the one worth doing; the phone sits
            under it at body size rather than beside it at equal weight, which
            would make neither the obvious move. */}
        <div className="lg:border-l lg:border-rule lg:pb-2 lg:pl-12">
          <a
            href={`mailto:${site.email}`}
            className="inline-block font-display font-semibold leading-none tracking-[-0.02em] transition-colors hover:text-spot [font-size:clamp(1.15rem,2.2vw,1.5rem)]"
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

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-7 lg:flex-col lg:gap-y-4">
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
        </div>
      </div>

      <p className="text-xs text-ink-3">
        West Lafayette, Indiana and Cherry Hill, New Jersey
      </p>
    </main>
  );
}

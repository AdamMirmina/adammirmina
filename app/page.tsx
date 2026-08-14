import { Frame, Facts, Out, Reveal, Section, Stack } from "@/components/primitives";
import { TopBar, Reveals } from "@/components/chrome";
import { alsoBuilt, elsewhere, music, now, projects, research, site, studio } from "@/lib/content";

export default function Home() {
  return (
    <>
      <TopBar />
      <Reveals />

      <main id="top">
        {/* ---------------------------------------------------------------- hero
            Only the name, the sentence, and a face. Everything below is evidence
            for that sentence, so nothing else belongs on the first screen. */}
        <section className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pb-24 pt-32">
          <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <Reveal>
                <p className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-spot">
                  {site.role}
                </p>
              </Reveal>
              <Reveal delay={60}>
                {/* clamp so it fills the line on a phone and on a 27-inch display
                    without a stack of breakpoints. */}
                <h1 className="font-display font-bold leading-[0.88] tracking-[-0.03em] [font-size:clamp(3.25rem,11vw,8.5rem)]">
                  Adam
                  <br />
                  Mirmina
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
                  {site.thesis}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-10 flex flex-wrap gap-6">
                  <Out href={site.links.github}>GitHub</Out>
                  <Out href={site.links.linkedin}>LinkedIn</Out>
                  <Out href={site.links.studio}>Ramsgate Studio</Out>
                </div>
              </Reveal>
            </div>

            {/* Shown on every size. Hiding it below lg left a phone with no
                image at all on a site whose whole premise is being visual, and
                the phone is where most people will open this. Capped in width so
                a 4:5 portrait does not eat a whole small screen. */}
            <Reveal delay={120} className="mx-auto w-full max-w-[16rem] lg:mx-0 lg:max-w-none">
              <Frame photo={site.portrait} priority />
            </Reveal>
          </div>

          <Reveal delay={280}>
            <a
              href="#now"
              className="mt-20 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-spot transition-colors hover:text-ink"
            >
              <span className="h-px w-10 bg-spot" aria-hidden />
              Start here
            </a>
          </Reveal>
        </section>

        {/* ---------------------------------------------------------------- now */}
        <Section id="now" label="Now" className="rule py-20 sm:py-24">
          <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {now.map((n, i) => (
              <Reveal key={n.label} delay={i * 70}>
                <dt className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-spot">
                  {n.label}
                </dt>
                <dd className="text-base leading-relaxed text-ink-2">{n.body}</dd>
              </Reveal>
            ))}
          </dl>
        </Section>

        {/* ---------------------------------------------------------------- work
            Each project leads with why it exists, in the first person, before a
            single technical word. That ordering is the whole argument of the
            site: the work came from somewhere. */}
        <Section id="work" label="Work" className="rule py-20 sm:py-28">
          <div className="space-y-24 sm:space-y-32">
            {projects.map((p, i) => (
              <article key={p.slug}>
                <Reveal>
                  <Frame photo={p.photo} />
                </Reveal>

                <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-[1fr_1fr]">
                  <div>
                    <Reveal delay={40}>
                      <div className="mb-5 flex items-baseline gap-4">
                        <h3 className="font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl">
                          {p.name}
                        </h3>
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-spot">
                          {p.kind} &middot; {p.year}
                        </span>
                      </div>
                    </Reveal>
                    <Reveal delay={80}>
                      {/* The origin, set larger than the description under it,
                          because it is the more interesting sentence. */}
                      <p className="max-w-md text-xl leading-snug sm:text-2xl">{p.origin}</p>
                    </Reveal>
                  </div>

                  <div className="space-y-8">
                    <Reveal delay={100}>
                      <p className="text-base leading-relaxed text-ink-2">{p.body}</p>
                    </Reveal>
                    <Reveal delay={140}>
                      <Facts facts={p.facts} />
                    </Reveal>
                    <Reveal delay={180}>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <Stack items={p.stack} />
                        {p.href ? <Out href={p.href}>See it</Out> : null}
                      </div>
                    </Reveal>
                  </div>
                </div>

                {i < projects.length - 1 ? <div className="rule mt-24 sm:mt-32" aria-hidden /> : null}
              </article>
            ))}
          </div>

          {/* Everything else, compactly. A portfolio that shows twelve projects at
              equal weight is asking the reader to do the editing. */}
          <div className="rule mt-24 pt-12 sm:mt-32">
            <h3 className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-spot">
              Also built
            </h3>
            <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
              {alsoBuilt.map((a, i) => (
                <Reveal key={a.name} delay={i * 40}>
                  <li className="flex gap-4">
                    <span className="min-w-[7.5rem] font-display text-lg font-semibold leading-snug">
                      {a.name}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-2">{a.note}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- research */}
        <Section id="research" label="Research" className="rule py-20 sm:py-28">
          <Reveal>
            <h3 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Measuring aortic disease from ultrasound
            </h3>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-5 text-sm text-ink-3">
              {research.lab} &middot; {research.period}
              <br />
              Principal Investigator {research.pi}. Supervised by {research.supervisor}.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-2">
              {research.context}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <Frame photo={research.photo} className="mt-12" />
          </Reveal>

          <div className="mt-14 space-y-10">
            {research.findings.map((f, i) => (
              <Reveal key={f.head} delay={i * 60}>
                <div className="grid gap-3 lg:grid-cols-[1fr_1fr] lg:gap-12">
                  <h4 className="text-xl leading-snug">{f.head}</h4>
                  <p className="text-base leading-relaxed text-ink-2">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---------------------------------------------------------------- studio */}
        <Section id="studio" label="Studio" className="rule py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <Reveal>
                <h3 className="font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl">
                  {studio.name}
                </h3>
              </Reveal>
              <Reveal delay={60}>
                <p className="mt-4 text-sm text-ink-3">{studio.period}</p>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-8 text-lg leading-relaxed text-ink-2">{studio.body}</p>
              </Reveal>
              <Reveal delay={140}>
                <div className="mt-8">
                  <Out href={studio.href}>ramsgatestudio.com</Out>
                </div>
              </Reveal>
            </div>
            <Reveal delay={80}>
              <Frame photo={studio.photo} />
            </Reveal>
          </div>

          <ul className="mt-14 space-y-6">
            {studio.points.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <li className="max-w-3xl border-l border-rule pl-6 text-base leading-relaxed text-ink-2">
                  {p}
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* ---------------------------------------------------------------- music
            Here because the work above came from a life, and this is the other
            half of it. Framed as a craft with output, not as a list of hobbies. */}
        <Section id="music" label="Music" className="rule py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <Frame photo={music.photo} />
            </Reveal>
            <div>
              <Reveal delay={60}>
                <p className="text-xl leading-relaxed sm:text-2xl">{music.body}</p>
              </Reveal>
              <dl className="mt-12 space-y-8">
                {music.points.map((m, i) => (
                  <Reveal key={m.head} delay={100 + i * 60}>
                    <dt className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-spot">
                      {m.head}
                    </dt>
                    <dd className="text-base leading-relaxed text-ink-2">{m.body}</dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>

          <div className="rule mt-20 pt-12">
            <ul className="grid gap-8 sm:grid-cols-3">
              {elsewhere.map((e, i) => (
                <Reveal key={e.head} delay={i * 50}>
                  <li>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-spot">
                      {e.head}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-2">{e.body}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- contact */}
        <Section id="contact" label="Contact" className="rule py-20 sm:py-28">
          <Reveal>
            <a
              href={`mailto:${site.email}`}
              className="font-display font-bold leading-none tracking-[-0.02em] transition-colors hover:text-spot [font-size:clamp(2rem,6vw,4.5rem)]"
            >
              {site.email}
            </a>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-12 flex flex-wrap gap-8">
              <Out href={site.links.github}>GitHub</Out>
              <Out href={site.links.linkedin}>LinkedIn</Out>
              <Out href={site.links.studio}>Ramsgate Studio</Out>
            </div>
          </Reveal>
        </Section>

        <footer className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-xs text-ink-3">
            Built and hosted by me. West Lafayette, Indiana and Cherry Hill, New Jersey.
          </p>
        </footer>
      </main>
    </>
  );
}

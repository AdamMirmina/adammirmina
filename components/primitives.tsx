import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Photo } from "@/lib/content";

/* Shared building blocks. Kept in one file because they are small and always
   read together; splitting them into eight files would cost more navigation
   than it saves. */

export function Section({
  id,
  label,
  children,
  className = "",
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      {/* The label sticks alongside the content on wide screens, so you always
          know where you are without a floating menu covering the work. */}
      <div className="mx-auto max-w-6xl px-6 lg:grid lg:grid-cols-[8rem_1fr] lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-spot lg:mb-0">
            {label}
          </h2>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/** Reveal wrapper. The class is applied by app/reveal.ts once it has confirmed
    IntersectionObserver exists, so this is inert and harmless without JS. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div data-reveal className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/**
 * A photograph, or the brief for the photograph that has not been taken yet.
 *
 * The placeholder is not a grey box. It states the aspect ratio and the actual
 * brief, so the page is usable as a shot list and so an empty slot reads as
 * pending rather than broken. Swap in the file at `src` and the same component
 * renders it with no other change.
 */
export function Frame({
  photo,
  priority = false,
  className = "",
}: {
  photo: Photo;
  priority?: boolean;
  className?: string;
}) {
  const [w, h] = photo.ratio;
  // Decided at build time by looking on disk, not at runtime with an onError
  // handler. Two reasons. A server component cannot carry an event handler at
  // all, which is what the first attempt tripped over. And this way a missing
  // photo never renders a broken-image icon for even one frame: the markup that
  // ships is already the right one.
  const present = existsSync(join(process.cwd(), "public", photo.src));

  return (
    <figure
      className={`relative overflow-hidden rounded-sm bg-paper-2 ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      {present ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={photo.src}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <figcaption className="frame-pending absolute inset-0 flex flex-col justify-end gap-2 border border-rule p-5">
          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-3">
            Photo &middot; {w}:{h}
          </span>
          <span className="max-w-md text-sm leading-relaxed text-ink-3">{photo.brief}</span>
        </figcaption>
      )}
    </figure>
  );
}

/** Large figures, set as type. Never a card with a coloured dot next to a
    number: that is the house style of every dashboard template.
 *
 * The width cap is deliberately desktop-only. It exists to stop a label running
 * the full width of a desktop column, and applying it at 390px only makes
 * three-word labels wrap for no reason. */
export function Facts({ facts }: { facts: { value: string; label: string }[] }) {
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-5">
      {facts.map((f) => (
        <div key={f.label} className="max-w-full sm:max-w-[13rem]">
          <dt className="font-display text-3xl font-bold leading-none tracking-tight">{f.value}</dt>
          <dd className="mt-2 text-sm leading-snug text-ink-2">{f.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Stack({ items }: { items: string[] }) {
  // Plain text separated by hairline dots. Rounded filled chips are the single
  // most recognisable "a component library made this" tell.
  return (
    <p className="text-xs uppercase tracking-[0.14em] text-ink-3">
      {items.join("  ·  ")}
    </p>
  );
}

export function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-baseline gap-1.5 text-sm text-ink transition-colors hover:text-ink-2"
    >
      <span className="border-b border-ink-3 pb-px transition-colors group-hover:border-spot">
        {children}
      </span>
      <span aria-hidden className="translate-y-px text-xs">&#8599;</span>
    </a>
  );
}

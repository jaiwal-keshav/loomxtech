import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <Reveal>
          <span className="chip mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-slate-400">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}

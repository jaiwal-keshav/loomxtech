import { Link } from 'react-router-dom'
import { services } from '../data/site'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import CTASection from '../components/CTASection'

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Everything you need to build and scale"
        subtitle="From a single product to your entire engineering function — we cover the full stack of modern software delivery."
      />

      <section className="container-x py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 0.08}>
              <article
                id={s.id}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-neon-violet/40 hover:shadow-glow-violet"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 text-neon-cyan ring-1 ring-white/10">
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-white">{s.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-neon-cyan/15 text-neon-cyan">
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book-service"
                  state={{ service: s.id }}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neon-cyan"
                >
                  Request this service
                  <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}

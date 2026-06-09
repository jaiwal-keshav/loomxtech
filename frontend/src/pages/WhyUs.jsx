import { whyUs, stats } from '../data/site'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import CTASection from '../components/CTASection'

export default function WhyUs() {
  return (
    <>
      <PageHeader
        eyebrow="Why LoomX"
        title="A partner built around your outcomes"
        subtitle="We don't just write code — we own results. Here's what makes working with us different."
      />

      <section className="container-x py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06}>
              <div className="glass-card h-full p-6 transition hover:-translate-y-1 hover:border-neon-cyan/40">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 text-neon-cyan ring-1 ring-white/10">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-12">
        <Reveal>
          <div className="glass-card grid grid-cols-2 gap-6 p-8 sm:grid-cols-4 sm:p-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold gradient-text sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <CTASection />
    </>
  )
}

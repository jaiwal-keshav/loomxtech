import { company, process } from '../data/site'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'

const values = [
  { icon: 'target', title: 'Outcome over output', body: 'We measure success by the value we create, not the lines we write.' },
  { icon: 'users', title: 'True partnership', body: 'We work as an extension of your team, with full transparency.' },
  { icon: 'shield', title: 'Quality by default', body: 'Secure, tested, observable systems — never corners cut.' },
  { icon: 'rocket', title: 'Bias for momentum', body: 'We help you ship and learn faster, without the chaos.' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="We turn ambitious ideas into production software"
        subtitle={`${company.name} is a service-based technology company helping startups and growing businesses build, automate, and scale.`}
      />

      {/* Story */}
      <section className="container-x py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="glass-card p-8">
              <h2 className="font-display text-2xl font-bold text-white">Our story</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                LoomX Technologies was founded on a simple belief: great software comes from a tight
                loop between product thinking, human-centered design, and scalable engineering.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                From our roots in <span className="text-white">Chhatrapati Sambhajinagar</span> and{' '}
                <span className="text-white">Pune</span>, we partner with founders and teams to take
                products all the way from idea to production — and keep them growing.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Whether it's end-to-end software development, AI implementation, automation, or cloud
                infrastructure management, our mission stays the same:{' '}
                <span className="gradient-text font-medium">from idea to app, we make it happen.</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.title} className="glass-card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 text-neon-cyan ring-1 ring-white/10">
                    <Icon name={v.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-white">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{v.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Locations */}
      <section className="container-x py-12">
        <SectionHeading eyebrow="Where we are" title="Two offices, one team" center />
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          {company.offices.map((o, i) => (
            <Reveal key={o.city} delay={i * 0.08}>
              <div className="glass-card flex items-center gap-4 p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-neon-cyan/15 text-neon-cyan">
                  <Icon name="map" className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{o.city}</h3>
                  <p className="text-sm text-slate-400">{o.region}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-12">
        <SectionHeading eyebrow="Our approach" title="From discovery to scale" center />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <div className="glass-card h-full p-6">
                <div className="font-display text-3xl font-bold gradient-text">{p.step}</div>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}

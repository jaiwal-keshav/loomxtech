import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { company, services, stats, process } from '../data/site'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import CTASection from '../components/CTASection'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-x relative z-10 flex flex-col items-center pt-20 pb-16 text-center sm:pt-28">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="chip"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-cyan" />
          Software · Web · App · AI · Automation · Cloud
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-fg sm:text-6xl"
        >
          From Idea to App,{' '}
          <span className="gradient-text animate-gradient-shift">We Make It Happen.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {company.motto}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link to="/book-consultation" className="btn-primary">
            Book a Consultation <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link to="/book-service" className="btn-ghost">Book a Service</Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass-card px-4 py-5">
              <div className="font-display text-2xl font-bold text-fg sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Services */}
      <section className="container-x py-20">
        <SectionHeading
          eyebrow="What we do"
          title="Services that take you end to end"
          subtitle="One partner from strategy to scale — engineering, design, AI, automation, and cloud."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-20">
        <SectionHeading
          eyebrow="How we work"
          title="A clear path from prototype to production"
          subtitle="A tight loop between product thinking, design, and scalable engineering."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <div className="glass-card h-full p-6">
                <div className="font-display text-4xl font-bold text-fg/10">{p.step}</div>
                <h3 className="-mt-4 font-display text-lg font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Engineering statement */}
      <section className="container-x py-16">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-violet" />
              Engineered to move
            </span>
            <h2 className="font-display text-3xl font-bold text-fg sm:text-4xl">
              Complexity, <span className="gradient-text">elegantly engineered</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Intricate systems, made to feel effortless. We sweat the architecture so your
              product stays fast, reliable, and a joy to build on — at any scale.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Why us strip */}
      <section className="container-x py-10">
        <Reveal>
          <div className="glass-card grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">
                Product-minded engineering, <span className="gradient-text">human-centered design</span>
              </h2>
              <p className="mt-4 text-muted">
                We build scalable systems for startups and growing businesses — combining deep
                technical craft with a relentless focus on user value and business outcomes.
              </p>
              <Link to="/why-us" className="btn-ghost mt-6">
                Why choose LoomX <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Scalable architecture', 'Human-centered UX', 'Faster delivery', 'End-to-end ownership'].map((t) => (
                <div key={t} className="flex items-center gap-3 rounded-xl border border-fg/10 bg-fg/[0.02] px-4 py-3">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-neon-cyan/15 text-neon-cyan">
                    <Icon name="check" className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm text-fg">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection />
    </>
  )
}

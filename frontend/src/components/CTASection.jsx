import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import Icon from './Icon'
import Magnetic from './Magnetic'

export default function CTASection() {
  return (
    <section className="container-x py-20">
      <Reveal>
        <div className="glass-card relative overflow-hidden px-6 py-14 text-center sm:px-12">
          <div className="aurora animate-pulse-slow left-1/4 top-0 h-64 w-64 bg-neon-cyan/30" />
          <div className="aurora animate-pulse-slow right-1/4 bottom-0 h-64 w-64 bg-neon-violet/30" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-fg sm:text-4xl">
              Ready to go <span className="gradient-text">from idea to app</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Tell us what you're building. We'll help you move faster from prototype to production.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Link to="/book-consultation" className="btn-primary">
                  Book a Consultation <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/book-service" className="btn-ghost">Book a Service</Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

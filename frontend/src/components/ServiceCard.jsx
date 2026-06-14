import { Link } from 'react-router-dom'
import Icon from './Icon'
import Tilt from './Tilt'

export default function ServiceCard({ service }) {
  return (
    <Tilt className="h-full">
      <Link
        to="/services"
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-fg/10 bg-fg/[0.03] p-6 transition-colors duration-300 hover:border-neon-cyan/40 hover:shadow-glow"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-neon-cyan/10 blur-2xl transition group-hover:bg-neon-cyan/20" />
        <span
          className="relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 text-neon-cyan ring-1 ring-fg/10"
          style={{ transform: 'translateZ(45px)' }}
        >
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
        <h3
          className="relative mt-5 font-display text-lg font-semibold text-fg"
          style={{ transform: 'translateZ(30px)' }}
        >
          {service.title}
        </h3>
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted" style={{ transform: 'translateZ(18px)' }}>
          {service.short}
        </p>
        <span
          className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neon-cyan"
          style={{ transform: 'translateZ(24px)' }}
        >
          Learn more
          <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </Link>
    </Tilt>
  )
}

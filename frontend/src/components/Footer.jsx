import { Link } from 'react-router-dom'
import { company, navLinks, services } from '../data/site'
import Icon from './Icon'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-24 border-t border-fg/10 bg-surface2/50">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-violet text-ink-950">
                <Icon name="code" className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-display text-lg font-bold text-fg">
                Loom<span className="gradient-text">X</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {company.tagline}
            </p>
            <div className="mt-5 flex gap-3">
              {[
                ['linkedin', company.socials.linkedin],
                ['twitter', company.socials.twitter],
                ['github', company.socials.github],
                ['instagram', company.socials.instagram],
              ].map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-fg/10 text-muted transition hover:border-neon-cyan/50 hover:text-neon-cyan"
                >
                  <Icon name={name} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-sm font-semibold text-fg">Navigate</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted transition hover:text-neon-cyan">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-fg">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link to="/services" className="text-sm text-muted transition hover:text-neon-cyan">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-fg">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2.5">
                <Icon name="mail" className="h-4 w-4 text-neon-cyan" />
                <a href={`mailto:${company.email}`} className="hover:text-fg">{company.email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="call" className="h-4 w-4 text-neon-cyan" />
                <a href={`tel:${company.phone}`} className="hover:text-fg">{company.phone}</a>
              </li>
              {company.offices.map((o) => (
                <li key={o.city} className="flex items-start gap-2.5">
                  <Icon name="map" className="mt-0.5 h-4 w-4 text-neon-cyan" />
                  <span>{o.city}, {o.region}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-fg/10 pt-6 text-xs text-faint sm:flex-row">
          <p>© {year} {company.name}. All rights reserved.</p>
          <p>From Idea to App, We Make It Happen.</p>
        </div>
      </div>
    </footer>
  )
}

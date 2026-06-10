import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import Icon from '../components/Icon'

const cards = [
  { key: 'consultations', label: 'Consultations', icon: 'calendar', to: '/admin/consultations', color: 'from-neon-cyan/20 to-neon-blue/20 text-neon-cyan' },
  { key: 'serviceRequests', label: 'Service Requests', icon: 'briefcase', to: '/admin/service-requests', color: 'from-neon-violet/20 to-neon-blue/20 text-neon-violet' },
  { key: 'contacts', label: 'Messages', icon: 'mail', to: '/admin/contacts', color: 'from-neon-cyan/20 to-neon-violet/20 text-neon-cyan' },
  { key: 'blogPosts', label: 'Blog Posts', icon: 'code', to: '/admin/blog', color: 'from-neon-blue/20 to-neon-violet/20 text-neon-blue' },
]

export default function Dashboard() {
  const [summary, setSummary] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.get('/api/admin/summary')
      .then(({ data }) => setSummary(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-fg">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Overview of leads and content.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.key} to={c.to} className="glass-card group p-6 transition hover:-translate-y-1 hover:border-neon-cyan/40">
            <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-fg/10 ${c.color}`}>
              <Icon name={c.icon} className="h-6 w-6" />
            </span>
            <div className="mt-4 font-display text-3xl font-bold text-fg">
              {loading ? '—' : (summary[c.key] ?? 0)}
            </div>
            <div className="mt-1 text-sm text-muted">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold text-fg">Quick actions</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/admin/blog/new" className="btn-primary">New blog post</Link>
            <Link to="/admin/consultations" className="btn-ghost">View consultations</Link>
            <Link to="/" className="btn-ghost">View site</Link>
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold text-fg">Welcome back 👋</h3>
          <p className="mt-2 text-sm text-muted">
            Manage incoming leads, respond to messages, and publish insights to the blog — all from here.
          </p>
        </div>
      </div>
    </div>
  )
}

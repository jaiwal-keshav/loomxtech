import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import { clearAuth, getUser } from './auth'
import Icon from '../components/Icon'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: 'chart', end: true },
  { to: '/admin/consultations', label: 'Consultations', icon: 'calendar' },
  { to: '/admin/service-requests', label: 'Service Requests', icon: 'briefcase' },
  { to: '/admin/contacts', label: 'Messages', icon: 'mail' },
  { to: '/admin/blog', label: 'Blog', icon: 'code' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const user = getUser()

  const logout = () => {
    clearAuth()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-ink-900/60 p-5 lg:flex">
        <Link to="/" className="flex items-center gap-2.5 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-violet text-ink-950">
            <Icon name="code" className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg font-bold text-white">
            Loom<span className="gradient-text">X</span>
          </span>
        </Link>
        <span className="mt-1 px-2 text-xs text-slate-500">Admin Panel</span>

        <nav className="mt-8 flex-1 space-y-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon name={n.icon} className="h-5 w-5" />
              {n.label}
            </NavLink>
          ))}
        </nav>

        <button onClick={logout} className="btn-ghost mt-4 w-full justify-start">
          <Icon name="arrow" className="h-4 w-4 rotate-180" /> Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Top bar (mobile nav + user) */}
        <header className="flex items-center justify-between border-b border-white/10 bg-ink-900/40 px-5 py-3">
          <div className="flex items-center gap-2 overflow-x-auto lg:hidden">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${
                    isActive ? 'bg-white/10 text-white' : 'text-slate-400'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-slate-400">
              Hi, <span className="text-white">{user?.username || 'admin'}</span>
            </span>
            <button onClick={logout} className="rounded-lg p-2 text-slate-400 hover:text-white lg:hidden" aria-label="Logout">
              <Icon name="arrow" className="h-4 w-4 rotate-180" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

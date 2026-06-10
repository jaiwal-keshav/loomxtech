import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import client from '../api/client'
import { saveAuth } from './auth'
import Icon from '../components/Icon'
import { Field, StatusBanner } from '../components/FormControls'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  const [form, setForm] = useState({ username: '', password: '' })
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({})
    try {
      const { data } = await client.post('/api/auth/login', form)
      saveAuth(data)
      navigate(from, { replace: true })
    } catch (err) {
      setStatus({ type: 'error', message: err?.response?.data?.message || 'Invalid credentials.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-violet text-ink-950">
            <Icon name="code" className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-xl font-bold text-fg">
            Loom<span className="gradient-text">X</span>
          </span>
        </Link>

        <form onSubmit={onSubmit} className="glass-card space-y-5 p-8">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-fg">Admin Login</h1>
            <p className="mt-1 text-sm text-muted">Sign in to manage LoomX</p>
          </div>
          <Field label="Username" name="username" required value={form.username} onChange={onChange} placeholder="admin" />
          <Field label="Password" name="password" type="password" required value={form.password} onChange={onChange} placeholder="••••••••" />
          <StatusBanner status={status} />
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/40 border-t-ink-950" />
            ) : (
              <>Sign In <Icon name="arrow" className="h-4 w-4" /></>
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-faint">
          Default seed: admin / Admin@123 — change in production.
        </p>
      </div>
    </div>
  )
}

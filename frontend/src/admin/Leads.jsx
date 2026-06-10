import { useEffect, useState } from 'react'
import client from '../api/client'
import Icon from '../components/Icon'

const config = {
  consultations: {
    title: 'Consultations',
    endpoint: '/api/admin/consultations',
    fields: [
      ['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'],
      ['company', 'Company'], ['topic', 'Topic'], ['preferredSlot', 'Preferred'],
      ['message', 'Message'], ['status', 'Status'],
    ],
  },
  'service-requests': {
    title: 'Service Requests',
    endpoint: '/api/admin/service-requests',
    fields: [
      ['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['company', 'Company'],
      ['service', 'Service'], ['budget', 'Budget'], ['timeline', 'Timeline'],
      ['details', 'Details'], ['status', 'Status'],
    ],
  },
  contacts: {
    title: 'Messages',
    endpoint: '/api/admin/contacts',
    fields: [['name', 'Name'], ['email', 'Email'], ['subject', 'Subject'], ['message', 'Message']],
  },
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return ''
  }
}

export default function Leads({ kind }) {
  const cfg = config[kind]
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    client.get(cfg.endpoint)
      .then(({ data }) => setRows([...data].reverse()))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [kind])

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-fg">{cfg.title}</h1>
          <p className="mt-1 text-sm text-muted">{rows.length} total</p>
        </div>
      </div>

      {loading ? (
        <div className="grid min-h-[30vh] place-items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-fg/10 border-t-neon-cyan" />
        </div>
      ) : error ? (
        <p className="mt-8 text-muted">Couldn't load data.</p>
      ) : rows.length === 0 ? (
        <div className="glass-card mt-8 grid place-items-center p-12 text-center">
          <Icon name="mail" className="h-10 w-10 text-faint" />
          <p className="mt-3 text-muted">Nothing here yet.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {rows.map((row) => (
            <div key={row.id} className="glass-card p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="font-display font-semibold text-fg">{row.name}</div>
                <div className="flex items-center gap-2 text-xs text-faint">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  {formatDate(row.createdAt)}
                </div>
              </div>
              <div className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                {cfg.fields.map(([key, label]) => {
                  const val = row[key]
                  if (val === undefined || val === null || val === '') return null
                  return (
                    <div key={key} className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-faint">{label}</span>
                      <span className="text-fg break-words">{String(val)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import Icon from './Icon'

export function Field({ label, name, type = 'text', required, value, onChange, placeholder }) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label} {required && <span className="text-neon-cyan">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
      />
    </div>
  )
}

export function TextArea({ label, name, required, value, onChange, placeholder, rows = 4 }) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label} {required && <span className="text-neon-cyan">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="input resize-none"
      />
    </div>
  )
}

export function Select({ label, name, required, value, onChange, options }) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label} {required && <span className="text-neon-cyan">*</span>}
      </label>
      <select id={name} name={name} required={required} value={value} onChange={onChange} className="input">
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function StatusBanner({ status }) {
  if (!status?.message) return null
  const ok = status.type === 'success'
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
        ok
          ? 'border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan'
          : 'border-red-500/30 bg-red-500/10 text-red-300'
      }`}
    >
      <Icon name={ok ? 'check' : 'close'} className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.4} />
      <span>{status.message}</span>
    </div>
  )
}

export function SubmitButton({ loading, children }) {
  return (
    <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/40 border-t-ink-950" />
          Sending…
        </>
      ) : (
        <>
          {children} <Icon name="send" className="h-4 w-4" />
        </>
      )}
    </button>
  )
}

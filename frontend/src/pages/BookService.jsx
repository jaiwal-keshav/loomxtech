import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import client from '../api/client'
import { services } from '../data/site'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { Field, TextArea, Select, StatusBanner, SubmitButton } from '../components/FormControls'
import Seo from '../components/Seo'

const serviceOptions = [
  { value: '', label: 'Select a service…' },
  ...services.map((s) => ({ value: s.id, label: s.title })),
]
const budgetOptions = [
  { value: '', label: 'Select budget…' },
  { value: '<5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 – $15,000' },
  { value: '15k-50k', label: '$15,000 – $50,000' },
  { value: '50k+', label: '$50,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
]
const timelineOptions = [
  { value: '', label: 'Select timeline…' },
  { value: 'asap', label: 'ASAP' },
  { value: '1-3m', label: '1–3 months' },
  { value: '3-6m', label: '3–6 months' },
  { value: 'flexible', label: 'Flexible' },
]

export default function BookService() {
  const location = useLocation()
  const preselect = location.state?.service || ''

  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    service: preselect, budget: '', timeline: '', details: '',
  })
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({})
    try {
      const { data } = await client.post('/api/service-requests', form)
      setStatus({ type: 'success', message: data.message })
      setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', details: '' })
    } catch (err) {
      setStatus({ type: 'error', message: err?.response?.data?.message || 'Could not submit. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo
        title="Book a Service"
        description="Request a service from LoomX Technologies — software, web, app, AI, automation, or cloud. Tell us what you need built."
        path="/book-service"
      />
      <PageHeader
        eyebrow="Book a Service"
        title="Tell us what you need built"
        subtitle="Share a few details and our team will get back to you with a tailored proposal."
      />

      <section className="container-x grid gap-8 py-12 lg:grid-cols-[1.2fr_1fr]">
        {/* Form */}
        <Reveal>
          <form onSubmit={onSubmit} className="glass-card space-y-5 p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" required value={form.name} onChange={onChange} placeholder="Jane Doe" />
              <Field label="Email" name="email" type="email" required value={form.email} onChange={onChange} placeholder="jane@company.com" />
              <Field label="Phone" name="phone" value={form.phone} onChange={onChange} placeholder="+91 …" />
              <Field label="Company" name="company" value={form.company} onChange={onChange} placeholder="Company name" />
            </div>
            <Select label="Service" name="service" required value={form.service} onChange={onChange} options={serviceOptions} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Select label="Budget" name="budget" value={form.budget} onChange={onChange} options={budgetOptions} />
              <Select label="Timeline" name="timeline" value={form.timeline} onChange={onChange} options={timelineOptions} />
            </div>
            <TextArea label="Project details" name="details" required value={form.details} onChange={onChange} placeholder="Describe what you want to build, key features, and goals." rows={5} />
            <StatusBanner status={status} />
            <SubmitButton loading={loading}>Submit Request</SubmitButton>
          </form>
        </Reveal>

        {/* Side: services list */}
        <Reveal delay={0.1}>
          <div className="glass-card h-full p-8">
            <h3 className="font-display text-xl font-semibold text-fg">Our services</h3>
            <ul className="mt-6 space-y-3">
              {services.map((s) => (
                <li key={s.id} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-neon-violet/15 text-neon-violet">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-fg">{s.title}</div>
                    <div className="text-xs text-muted">{s.short}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  )
}

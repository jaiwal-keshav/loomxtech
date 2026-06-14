import { useState } from 'react'
import client from '../api/client'
import { services } from '../data/site'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { Field, TextArea, Select, StatusBanner, SubmitButton } from '../components/FormControls'
import Seo from '../components/Seo'

const topicOptions = [
  { value: '', label: 'Select a topic…' },
  ...services.map((s) => ({ value: s.title, label: s.title })),
  { value: 'Other', label: 'Other / Not sure yet' },
]

export default function BookConsultation() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', topic: '', preferredSlot: '', message: '',
  })
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({})
    try {
      const { data } = await client.post('/api/consultations', form)
      setStatus({ type: 'success', message: data.message })
      setForm({ name: '', email: '', phone: '', company: '', topic: '', preferredSlot: '', message: '' })
    } catch (err) {
      setStatus({ type: 'error', message: err?.response?.data?.message || 'Could not submit. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo
        title="Book a Consultation"
        description="Book a free consultation with LoomX Technologies. We'll help you map the fastest path from idea to app."
        path="/book-consultation"
      />
      <PageHeader
        eyebrow="Book a Consultation"
        title="Let's talk about what you're building"
        subtitle="Book a free, no-obligation consultation. We'll help you map the fastest path from idea to app."
      />

      <section className="container-x grid gap-8 py-12 lg:grid-cols-[1fr_1.2fr]">
        {/* Side info */}
        <Reveal>
          <div className="glass-card h-full p-8">
            <h3 className="font-display text-xl font-semibold text-fg">What to expect</h3>
            <ul className="mt-6 space-y-5">
              {[
                ['clock', '30-minute call', 'A focused conversation about your goals and challenges.'],
                ['target', 'Tailored guidance', 'Concrete next steps and an approach mapped to your needs.'],
                ['shield', 'No pressure', 'Just honest advice — no obligation to proceed.'],
              ].map(([icon, t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neon-cyan/15 text-neon-cyan">
                    <Icon name={icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-medium text-fg">{t}</div>
                    <div className="text-sm text-muted">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="glass-card space-y-5 p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" required value={form.name} onChange={onChange} placeholder="Jane Doe" />
              <Field label="Email" name="email" type="email" required value={form.email} onChange={onChange} placeholder="jane@company.com" />
              <Field label="Phone" name="phone" value={form.phone} onChange={onChange} placeholder="+91 …" />
              <Field label="Company" name="company" value={form.company} onChange={onChange} placeholder="Company name" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Select label="Topic" name="topic" value={form.topic} onChange={onChange} options={topicOptions} />
              <Field label="Preferred date / time" name="preferredSlot" value={form.preferredSlot} onChange={onChange} placeholder="e.g. Mon 3 PM IST" />
            </div>
            <TextArea label="Tell us about your project" name="message" value={form.message} onChange={onChange} placeholder="What are you trying to build or solve?" rows={4} />
            <StatusBanner status={status} />
            <SubmitButton loading={loading}>Request Consultation</SubmitButton>
          </form>
        </Reveal>
      </section>
    </>
  )
}

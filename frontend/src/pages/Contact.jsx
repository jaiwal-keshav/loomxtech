import { useState } from 'react'
import client from '../api/client'
import { company } from '../data/site'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { Field, TextArea, StatusBanner, SubmitButton } from '../components/FormControls'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({})
    try {
      const { data } = await client.post('/api/contact', form)
      setStatus({ type: 'success', message: data.message })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus({ type: 'error', message: err?.response?.data?.message || 'Could not send. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's start a conversation"
        subtitle="Questions, ideas, or partnerships — we'd love to hear from you."
      />

      <section className="container-x grid gap-8 py-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="glass-card h-full p-8">
            <h3 className="font-display text-xl font-semibold text-fg">Reach us directly</h3>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neon-cyan/15 text-neon-cyan">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-faint">Email</div>
                  <a href={`mailto:${company.email}`} className="text-fg hover:text-neon-cyan">{company.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neon-cyan/15 text-neon-cyan">
                  <Icon name="call" className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-faint">Phone</div>
                  <a href={`tel:${company.phone}`} className="text-fg hover:text-neon-cyan">{company.phone}</a>
                </div>
              </li>
              {company.offices.map((o) => (
                <li key={o.city} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neon-cyan/15 text-neon-cyan">
                    <Icon name="map" className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-faint">Office</div>
                    <div className="text-fg">{o.city}</div>
                    <div className="text-sm text-muted">{o.region}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="glass-card space-y-5 p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" required value={form.name} onChange={onChange} placeholder="Your name" />
              <Field label="Email" name="email" type="email" required value={form.email} onChange={onChange} placeholder="you@email.com" />
            </div>
            <Field label="Subject" name="subject" value={form.subject} onChange={onChange} placeholder="How can we help?" />
            <TextArea label="Message" name="message" required value={form.message} onChange={onChange} placeholder="Write your message…" rows={5} />
            <StatusBanner status={status} />
            <SubmitButton loading={loading}>Send Message</SubmitButton>
          </form>
        </Reveal>
      </section>
    </>
  )
}

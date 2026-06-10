import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import client from '../api/client'
import Icon from '../components/Icon'
import { Field, TextArea, StatusBanner } from '../components/FormControls'

const empty = {
  title: '', slug: '', excerpt: '', content: '', coverImage: '', author: 'LoomX Team', tags: '', published: true,
}

export default function BlogEditor() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    client.get(`/api/admin/blog/${id}`)
      .then(({ data }) => setForm({ ...empty, ...data }))
      .catch(() => setStatus({ type: 'error', message: 'Could not load post.' }))
      .finally(() => setLoading(false))
  }, [id])

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setStatus({})
    try {
      if (isEdit) {
        await client.put(`/api/admin/blog/${id}`, form)
      } else {
        await client.post('/api/admin/blog', form)
      }
      navigate('/admin/blog')
    } catch (err) {
      setStatus({ type: 'error', message: err?.response?.data?.message || 'Could not save post.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="grid min-h-[40vh] place-items-center">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-fg/10 border-t-neon-cyan" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <Link to="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-neon-cyan">
        <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back to blog
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-fg">{isEdit ? 'Edit post' : 'New post'}</h1>

      <form onSubmit={onSubmit} className="glass-card mt-6 space-y-5 p-6 sm:p-8">
        <Field label="Title" name="title" required value={form.title} onChange={onChange} placeholder="Post title" />
        <Field label="Slug (optional — auto-generated)" name="slug" value={form.slug} onChange={onChange} placeholder="my-post-url" />
        <TextArea label="Excerpt" name="excerpt" value={form.excerpt} onChange={onChange} placeholder="Short summary for cards…" rows={2} />
        <TextArea label="Content (Markdown supported)" name="content" required value={form.content} onChange={onChange} placeholder="Write your article in Markdown…" rows={14} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Cover image URL" name="coverImage" value={form.coverImage} onChange={onChange} placeholder="https://…" />
          <Field label="Author" name="author" value={form.author} onChange={onChange} placeholder="LoomX Team" />
        </div>
        <Field label="Tags (comma separated)" name="tags" value={form.tags} onChange={onChange} placeholder="engineering, ai, product" />

        <label className="flex items-center gap-3 text-sm text-fg">
          <input type="checkbox" name="published" checked={form.published} onChange={onChange} className="h-4 w-4 rounded border-fg/20 bg-surface accent-neon-cyan" />
          Published (visible on the public blog)
        </label>

        <StatusBanner status={status} />

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Saving…' : (isEdit ? 'Update post' : 'Create post')}
            {!saving && <Icon name="check" className="h-4 w-4" strokeWidth={2.4} />}
          </button>
          <Link to="/admin/blog" className="btn-ghost">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

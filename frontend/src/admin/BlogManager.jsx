import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import Icon from '../components/Icon'

export default function BlogManager() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    client.get('/api/admin/blog')
      .then(({ data }) => setPosts(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const remove = async (id) => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    try {
      await client.delete(`/api/admin/blog/${id}`)
      setPosts((p) => p.filter((x) => x.id !== id))
    } catch {
      alert('Could not delete post.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-fg">Blog</h1>
          <p className="mt-1 text-sm text-muted">{posts.length} posts</p>
        </div>
        <Link to="/admin/blog/new" className="btn-primary">
          <Icon name="spark" className="h-4 w-4" /> New post
        </Link>
      </div>

      {loading ? (
        <div className="grid min-h-[30vh] place-items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-fg/10 border-t-neon-cyan" />
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card mt-8 grid place-items-center p-12 text-center">
          <Icon name="code" className="h-10 w-10 text-faint" />
          <p className="mt-3 text-muted">No posts yet.</p>
          <Link to="/admin/blog/new" className="btn-ghost mt-4">Write your first post</Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="glass-card flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${p.published ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                  <span className="truncate font-medium text-fg">{p.title}</span>
                </div>
                <div className="mt-1 truncate text-xs text-faint">/{p.slug} · {p.published ? 'Published' : 'Draft'}</div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link to={`/admin/blog/${p.id}`} className="rounded-lg border border-fg/10 px-3 py-1.5 text-xs text-muted hover:border-neon-cyan/50 hover:text-fg">
                  Edit
                </Link>
                <button onClick={() => remove(p.id)} className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:border-red-500/50 hover:bg-red-500/10">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

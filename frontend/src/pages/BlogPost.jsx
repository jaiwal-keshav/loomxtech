import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import client from '../api/client'
import Icon from '../components/Icon'
import Seo from '../components/Seo'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return ''
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    client
      .get(`/api/blog/${slug}`)
      .then(({ data }) => setPost(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-fg/10 border-t-neon-cyan" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-fg">Post not found</h1>
        <Link to="/blog" className="btn-ghost mt-6">Back to blog</Link>
      </div>
    )
  }

  const tags = (post.tags || '').split(',').map((t) => t.trim()).filter(Boolean)

  return (
    <article className="container-x max-w-3xl py-16">
      <Seo title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-neon-cyan">
        <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back to blog
      </Link>

      <div className="mt-6 flex items-center gap-2 text-xs text-faint">
        <span>{formatDate(post.createdAt)}</span>
        {post.author && <><span>·</span><span>{post.author}</span></>}
      </div>

      <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-fg sm:text-4xl">{post.title}</h1>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="chip">#{t}</span>
          ))}
        </div>
      )}

      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="mt-8 w-full rounded-2xl border border-fg/10" />
      )}

      <div className="prose-loomx mt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      <div className="mt-12 rounded-2xl border border-fg/10 bg-fg/[0.03] p-6 text-center">
        <p className="text-muted">Have a project in mind?</p>
        <Link to="/book-consultation" className="btn-primary mt-4">
          Book a Consultation <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import Seo from '../components/Seo'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    client
      .get('/api/blog')
      .then(({ data }) => setPosts(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Seo
        title="Blog"
        description="Insights on building, scaling, and shipping software — engineering, product, design, and AI from the LoomX team."
        path="/blog"
      />
      <PageHeader
        eyebrow="Insights"
        title="Ideas on building, scaling, and shipping"
        subtitle="Engineering, product, design, and AI — lessons from taking ideas to production."
      />

      <section className="container-x py-12">
        {loading ? (
          <div className="grid min-h-[30vh] place-items-center">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-fg/10 border-t-neon-cyan" />
          </div>
        ) : error ? (
          <p className="text-center text-muted">Couldn't load posts right now. Please try again later.</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted">No posts yet — check back soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.06}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-fg/10 bg-fg/[0.03] transition hover:-translate-y-1 hover:border-neon-cyan/40 hover:shadow-glow"
                >
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-neon-cyan/15 to-neon-violet/15">
                    {p.coverImage ? (
                      <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="grid h-full place-items-center text-neon-cyan/40">
                        <Icon name="code" className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-faint">
                      <span>{formatDate(p.createdAt)}</span>
                      {p.author && <><span>·</span><span>{p.author}</span></>}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-fg group-hover:text-neon-cyan">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-neon-cyan">
                      Read article <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

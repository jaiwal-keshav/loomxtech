import { useEffect } from 'react'
import { company } from '../data/site'

const SITE_URL = 'https://loomxtech.com'

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Lightweight per-page SEO: sets title, description, canonical and OG/Twitter
// tags on mount. No external dependency.
export default function Seo({ title, description, path = '' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${company.name}` : `${company.name} — ${company.tagline}`
    document.title = fullTitle

    const desc = description || company.motto
    upsertMeta('name', 'description', desc)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:url', SITE_URL + path)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', desc)

    // canonical
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', SITE_URL + path)
  }, [title, description, path])

  return null
}

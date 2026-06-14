// Warms a route's lazy chunk on hover/focus so navigation feels instant.
// These import() calls resolve to the same chunks used by lazy() in App.jsx,
// so Vite/Rollup dedupes them.
const loaders = {
  '/': () => import('./pages/Home'),
  '/services': () => import('./pages/Services'),
  '/why-us': () => import('./pages/WhyUs'),
  '/about': () => import('./pages/About'),
  '/blog': () => import('./pages/Blog'),
  '/contact': () => import('./pages/Contact'),
  '/book-consultation': () => import('./pages/BookConsultation'),
  '/book-service': () => import('./pages/BookService'),
}

const prefetched = new Set()

export function prefetchRoute(path) {
  const loader = loaders[path]
  if (loader && !prefetched.has(path)) {
    prefetched.add(path)
    loader().catch(() => prefetched.delete(path))
  }
}

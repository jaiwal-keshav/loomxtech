import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import AnimatedBackground from './components/AnimatedBackground'
import ScrollToTop from './components/ScrollToTop'
import Layout from './components/Layout'

// Lazy-load pages for fast initial load + code splitting.
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const WhyUs = lazy(() => import('./pages/WhyUs'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const BookConsultation = lazy(() => import('./pages/BookConsultation'))
const BookService = lazy(() => import('./pages/BookService'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Admin
const AdminLogin = lazy(() => import('./admin/AdminLogin'))
const AdminLayout = lazy(() => import('./admin/AdminLayout'))
const Dashboard = lazy(() => import('./admin/Dashboard'))
const Leads = lazy(() => import('./admin/Leads'))
const BlogManager = lazy(() => import('./admin/BlogManager'))
const BlogEditor = lazy(() => import('./admin/BlogEditor'))
import RequireAuth from './admin/RequireAuth'

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-neon-cyan" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public site */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/book-service" element={<BookService />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="consultations" element={<Leads kind="consultations" />} />
            <Route path="service-requests" element={<Leads kind="service-requests" />} />
            <Route path="contacts" element={<Leads kind="contacts" />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="blog/new" element={<BlogEditor />} />
            <Route path="blog/:id" element={<BlogEditor />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[70vh] place-items-center py-20 text-center">
      <div>
        <div className="font-display text-7xl font-bold gradient-text">404</div>
        <h1 className="mt-4 font-display text-2xl font-bold text-white">Page not found</h1>
        <p className="mt-3 text-slate-400">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn-primary mt-8">
          Back home <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

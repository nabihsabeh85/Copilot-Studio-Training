import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-teal">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted">
        That route isn&apos;t part of Agent Academy. Head home and pick a module.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-pill bg-violet px-5 py-2.5 font-display text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </div>
  )
}

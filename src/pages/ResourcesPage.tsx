import { Link } from 'react-router-dom'
import { modules } from '../content/modules'
import { keepLearning, flattenGoDeeperByModule } from '../content/links'

export function ResourcesPage() {
  const goDeeperGroups = flattenGoDeeperByModule(modules)

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-bold">Resources</h1>
      <p className="mt-2 text-muted">
        Official Microsoft documentation for every module, plus a few places to keep learning after
        the course.
      </p>

      <section className="mt-8" aria-labelledby="keep-learning-heading">
        <h2 id="keep-learning-heading" className="font-display text-lg font-bold text-violet">
          Keep learning
        </h2>
        <ul className="mt-3 space-y-3">
          {keepLearning.map((link) => (
            <li key={link.url} className="rounded-inner border border-line bg-card p-4">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-semibold text-violet underline decoration-violet-soft underline-offset-2 hover:decoration-violet"
              >
                {link.label}
              </a>
              {link.note ? <p className="mt-1 text-sm text-muted">{link.note}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="go-deeper-heading">
        <h2 id="go-deeper-heading" className="font-display text-lg font-bold text-teal">
          Go deeper, by module
        </h2>
        <div className="mt-4 space-y-5">
          {goDeeperGroups.map((group) => (
            <div key={group.moduleId} className="rounded-card border border-line bg-card p-5">
              <Link
                to={`/module/${group.moduleId}`}
                className="font-display text-sm font-bold hover:text-violet"
              >
                {String(group.moduleId).padStart(2, '0')} · {group.title}
              </Link>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet underline decoration-violet-soft underline-offset-2 hover:decoration-violet"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

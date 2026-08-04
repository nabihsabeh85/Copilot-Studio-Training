import { getModuleById } from '../content/modules'
import { houseRules } from '../content/links'

export function CheatSheetPage() {
  const devTestProd = getModuleById(2)
  const weeklyReview = getModuleById(9)
  const prePublish = getModuleById(10)

  return (
    <div className="mx-auto max-w-4xl print:max-w-full">
      <div className="flex flex-wrap items-start justify-between gap-3 print:hidden">
        <div>
          <h1 className="font-display text-3xl font-bold">Cheat sheet</h1>
          <p className="mt-2 max-w-[60ch] text-muted">
            The whole course on one screen: house rules, the pre-publish checklist, the weekly
            review ritual, and the Dev → Test → Prod rule. Print it and pin it up.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="shrink-0 rounded-pill border border-line px-4 py-2 font-mono text-xs uppercase tracking-wide hover:border-violet"
        >
          Print cheat sheet
        </button>
      </div>

      <h1 className="hidden font-display text-2xl font-bold print:mb-4 print:block">
        Agent Academy — Cheat sheet
      </h1>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 print:mt-0 print:grid-cols-2 print:gap-3">
        <section className="rounded-card border border-line bg-card p-5 print:break-inside-avoid print:border-ink print:p-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.06em] text-violet">
            House rules
          </h2>
          <ul className="mt-3 space-y-3 print:space-y-1.5">
            {houseRules.map((rule) => (
              <li key={rule.title} className="text-sm print:text-[11px]">
                <p className="font-display font-semibold">{rule.title}</p>
                <p className="text-muted print:text-ink/80">{rule.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {devTestProd ? (
          <section className="rounded-card border border-line bg-card p-5 print:break-inside-avoid print:border-ink print:p-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.06em] text-teal">
              Dev → Test → Prod
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm print:space-y-1 print:text-[11px]">
              {devTestProd.watchOuts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {prePublish ? (
          <section className="rounded-card border border-line bg-card p-5 print:break-inside-avoid print:border-ink print:p-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.06em] text-sun">
              Pre-publish checklist
            </h2>
            <ul className="mt-3 space-y-2 text-sm print:space-y-1 print:text-[11px]">
              {prePublish.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    className="mt-0.5 size-3.5 shrink-0 rounded border border-ink print:border-black"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {weeklyReview ? (
          <section className="rounded-card border border-line bg-card p-5 print:break-inside-avoid print:border-ink print:p-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.06em] text-violet">
              Weekly review ritual
            </h2>
            <ul className="mt-3 space-y-2 text-sm print:space-y-1 print:text-[11px]">
              {weeklyReview.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    className="mt-0.5 size-3.5 shrink-0 rounded border border-ink print:border-black"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  )
}

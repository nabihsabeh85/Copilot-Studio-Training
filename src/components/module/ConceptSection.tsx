import type { ConceptBlock } from '../../content/types'
import { RichText } from './RichText'
import { Table } from '../ui/Table'

interface ConceptSectionProps {
  blocks: ConceptBlock[]
}

export function ConceptSection({ blocks }: ConceptSectionProps) {
  return (
    <section id="concept" className="scroll-mt-28">
      <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-[0.06em]">
        In plain words
      </h2>
      <div className="space-y-4 text-[15.5px]">
        {blocks.map((block, i) => {
          if (block.type === 'paragraph') {
            return (
              <p key={i}>
                <RichText tokens={block.tokens} />
              </p>
            )
          }
          if (block.type === 'list') {
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="relative pl-7">
                    <span
                      className="absolute left-1 top-[0.55rem] size-3 rounded-full border-[2.5px] border-teal"
                      aria-hidden="true"
                    />
                    <RichText tokens={item} />
                  </li>
                ))}
              </ul>
            )
          }
          return <Table key={i} headers={block.headers} rows={block.rows} caption={block.caption} />
        })}
      </div>
    </section>
  )
}

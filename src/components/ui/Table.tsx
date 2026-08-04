interface TableProps {
  headers: string[]
  rows: string[][]
  caption?: string
}

export function Table({ headers, rows, caption }: TableProps) {
  return (
    <div className="my-4 overflow-x-auto rounded-block border border-line">
      <table className="w-full min-w-[320px] border-collapse text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="bg-violet-soft">
          <tr>
            {headers.map((h) => (
              <th key={h} className="border-b border-line px-4 py-2.5 font-display font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="odd:bg-paper/60">
              {row.map((cell, j) => (
                <td key={j} className="border-b border-line px-4 py-2.5 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

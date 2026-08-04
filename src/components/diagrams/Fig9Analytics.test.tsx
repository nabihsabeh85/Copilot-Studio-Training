import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Fig9Analytics } from './Fig9Analytics'

describe('Fig9Analytics', () => {
  it('shows a session count when a bar is hovered', async () => {
    const user = userEvent.setup()
    render(<Fig9Analytics />)

    await user.hover(screen.getByRole('img', { name: /week 3: 214 sessions/i }))

    expect(screen.getByText(/week 3: 214 sessions/i)).toBeInTheDocument()
  })

  it('emphasizes the escalated card when simulating a bad week', async () => {
    const user = userEvent.setup()
    render(<Fig9Analytics />)

    expect(screen.queryByText(/escalations spiked/i)).not.toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: /simulate a bad week/i }))

    expect(screen.getByText(/escalations spiked/i)).toBeInTheDocument()
    expect(screen.getByText(/investigate why/i, { selector: 'p' })).toBeInTheDocument()
  })
})

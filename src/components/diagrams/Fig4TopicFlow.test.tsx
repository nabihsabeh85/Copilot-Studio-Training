import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Fig4TopicFlow } from './Fig4TopicFlow'

describe('Fig4TopicFlow', () => {
  it('lights up the knowledge path for a routine question', async () => {
    const user = userEvent.setup()
    render(<Fig4TopicFlow />)

    await user.click(screen.getByRole('button', { name: /ask: routine question/i }))

    expect(screen.getByText(/answers straight from its knowledge/i)).toBeInTheDocument()
  })

  it('lights up the escalate path for an urgent issue', async () => {
    const user = userEvent.setup()
    render(<Fig4TopicFlow />)

    await user.click(screen.getByRole('button', { name: /ask: urgent issue/i }))

    expect(screen.getByText(/routes it to a person/i)).toBeInTheDocument()
  })
})

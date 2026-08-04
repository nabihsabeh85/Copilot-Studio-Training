import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Fig8EvaluationLoop } from './Fig8EvaluationLoop'

describe('Fig8EvaluationLoop', () => {
  it('shows the first stage description by default with a Pause control', () => {
    render(<Fig8EvaluationLoop />)
    expect(screen.getByText(/collect real questions/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^pause$/i })).toBeInTheDocument()
  })

  it('pauses on the clicked stage and shows its description', async () => {
    const user = userEvent.setup()
    render(<Fig8EvaluationLoop />)

    await user.click(screen.getByRole('button', { name: /run evaluation:/i }))

    expect(screen.getByText(/run the agent against every test question/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^resume$/i })).toBeInTheDocument()
  })

  it('resumes when clicking the already-active stage again', async () => {
    const user = userEvent.setup()
    render(<Fig8EvaluationLoop />)

    const stage = screen.getByRole('button', { name: /review results:/i })
    await user.click(stage)
    expect(screen.getByRole('button', { name: /^resume$/i })).toBeInTheDocument()

    await user.click(stage)
    expect(screen.getByRole('button', { name: /^pause$/i })).toBeInTheDocument()
  })
})

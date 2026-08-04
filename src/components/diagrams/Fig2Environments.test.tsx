import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Fig2Environments } from './Fig2Environments'

describe('Fig2Environments', () => {
  it('does not show a card before selecting an environment', () => {
    render(<Fig2Environments />)
    expect(screen.queryByText(/what happens here/i)).not.toBeInTheDocument()
  })

  it('reveals what happens and what to never do when Production is clicked', async () => {
    const user = userEvent.setup()
    render(<Fig2Environments />)

    await user.click(screen.getByRole('button', { name: /^production:/i }))

    expect(screen.getByText(/production · what happens here/i)).toBeInTheDocument()
    expect(screen.getByText(/real users rely on this/i)).toBeInTheDocument()
    expect(
      screen.getByText(/never build or experiment directly in production/i),
    ).toBeInTheDocument()
  })

  it('supports keyboard activation', async () => {
    const user = userEvent.setup()
    render(<Fig2Environments />)

    const testBox = screen.getByRole('button', { name: /^test:/i })
    testBox.focus()
    await user.keyboard('{Enter}')

    expect(screen.getByText(/other people verify your work/i)).toBeInTheDocument()
  })
})

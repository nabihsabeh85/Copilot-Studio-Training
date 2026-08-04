import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Fig6MultiAgentRouting } from './Fig6MultiAgentRouting'

describe('Fig6MultiAgentRouting', () => {
  it('routes an IT question to the IT specialist', async () => {
    const user = userEvent.setup()
    render(<Fig6MultiAgentRouting />)

    await user.click(screen.getByRole('button', { name: /my laptop won't start/i }))

    expect(screen.getByText(/routed to the it specialist/i)).toBeInTheDocument()
  })

  it('routes an HR question to the HR specialist', async () => {
    const user = userEvent.setup()
    render(<Fig6MultiAgentRouting />)

    await user.click(screen.getByRole('button', { name: /pto accrual/i }))

    expect(screen.getByText(/routed to the hr specialist/i)).toBeInTheDocument()
  })
})

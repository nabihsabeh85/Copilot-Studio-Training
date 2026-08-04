import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Fig10PublishPath } from './Fig10PublishPath'

describe('Fig10PublishPath', () => {
  it('nudges when Teams is clicked before the demo has been visited', async () => {
    const user = userEvent.setup()
    render(<Fig10PublishPath />)

    await user.click(screen.getByRole('button', { name: /teams.*locked/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/demo first!/i)
  })

  it('unlocks Teams after the demo website has been visited', async () => {
    const user = userEvent.setup()
    render(<Fig10PublishPath />)

    await user.click(screen.getByRole('button', { name: /demo website: stakeholder review/i }))
    expect(screen.getByText(/teams is now unlocked/i)).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /teams & microsoft 365: admin approval needed/i }),
    )

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByText(/now live in teams/i)).toBeInTheDocument()
  })
})

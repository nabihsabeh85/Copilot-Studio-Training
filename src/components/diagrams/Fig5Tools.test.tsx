import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Fig5Tools } from './Fig5Tools'

describe('Fig5Tools', () => {
  it('shows the default example actions', () => {
    render(<Fig5Tools />)
    expect(screen.getByText('Send an email')).toBeInTheDocument()
    expect(screen.getByText('Look up a record')).toBeInTheDocument()
    expect(screen.getByText('Start an approval')).toBeInTheDocument()
  })

  it('cycles to the next example set when the connector is clicked', async () => {
    const user = userEvent.setup()
    render(<Fig5Tools />)

    await user.click(screen.getByRole('button', { name: /connector: a pre-built bridge/i }))

    expect(screen.getByText('Create a file')).toBeInTheDocument()
    expect(screen.getByText('Post a message')).toBeInTheDocument()
    expect(screen.getByText('Update a row')).toBeInTheDocument()
    expect(screen.queryByText('Send an email')).not.toBeInTheDocument()
  })

  it('wraps back to the first example set', async () => {
    const user = userEvent.setup()
    render(<Fig5Tools />)

    const connector = screen.getByRole('button', { name: /connector: a pre-built bridge/i })
    await user.click(connector)
    await user.click(connector)
    await user.click(connector)

    expect(screen.getByText('Send an email')).toBeInTheDocument()
  })
})

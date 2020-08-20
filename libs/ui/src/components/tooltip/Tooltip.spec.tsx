import { render, waitFor, fireEvent } from '@testing-library/react'
import React from 'react'
import { Default } from './Tooltip.stories'

describe('Tooltip', () => {
  it('should render with text', async () => {
    const { getByText, getByRole } = render(<Default />)
    const content = getByText('Tooltip will show on mouse enter.')

    expect(content).toBeTruthy()

    fireEvent.mouseOver(content)
    await waitFor(() => expect(getByRole('tooltip')).toBeInTheDocument())

    fireEvent.mouseOut(content)
    await waitFor(() => expect(getByRole('tooltip')).not.toBeVisible())
  })
})

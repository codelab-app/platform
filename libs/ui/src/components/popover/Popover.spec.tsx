import { render, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './Popover.stories'

describe('Popover', () => {
  it('should render with text', async () => {
    const { getByText, getByRole, getAllByText } = render(<Default />)

    expect(getByText('Hover me')).toBeTruthy()

    const text = getByText('Hover me')

    fireEvent.mouseOver(text)
    await waitFor(() => {
      expect(getByRole('tooltip')).toBeInTheDocument()
      expect(getByText('Title')).toBeInTheDocument()
      expect(getAllByText('Content')).toHaveLength(2)
    })

    fireEvent.mouseOut(text)
    await waitFor(() => expect(getByRole('tooltip')).not.toBeVisible())
  })
})

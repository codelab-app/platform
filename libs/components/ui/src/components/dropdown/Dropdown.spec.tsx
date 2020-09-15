import { fireEvent, getByRole, render, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './Dropdown.stories'

describe('Dropdown', () => {
  it('should render with text', async () => {
    const { getByText } = render(<Default />)

    expect(getByText('Hover me')).toBeTruthy()

    fireEvent.mouseOver(getByText('Hover me'))

    await waitFor(() => expect(getByRole(document.body, 'menu')).toBeTruthy())
  })
})

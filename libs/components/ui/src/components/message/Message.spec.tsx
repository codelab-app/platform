import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './Message.stories'

describe('Message', () => {
  it('should render with text', async () => {
    const { getByText } = render(<Default />)

    expect(getByText('Display message')).toBeTruthy()

    fireEvent.click(getByText('Display message'))

    await waitFor(() => {
      expect(getByText('This is a normal message')).toBeTruthy()
    })
  })
})

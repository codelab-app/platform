import { render, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './Affix.stories'

describe('Affix', () => {
  it('should render with text', async () => {
    const { getByText } = render(<Default />)

    expect(getByText('120px to affix top')).toBeTruthy()

    fireEvent.scroll(window)

    await waitFor(() => {
      expect(getByText('120px to affix top').parentElement).toHaveStyle({
        top: '120px',
      })
    })
  })
})

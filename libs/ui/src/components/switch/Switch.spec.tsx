import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { Default } from './Switch.stories'

describe('Switch', () => {
  it('should render with text', () => {
    const { getByText, getByRole } = render(<Default />)
    const button = getByRole('switch')

    expect(button).toBeTruthy()
    expect(getByText('Off')).toBeTruthy()

    fireEvent.click(button)

    expect(getByText('On')).toBeTruthy()
  })
})

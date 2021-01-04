import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Default } from './Modal.stories'

describe('Modal', () => {
  it('should render with text', () => {
    const { getByText, getByRole } = render(<Default />)
    const button = getByText('Open modal')

    expect(button).toBeTruthy()

    fireEvent.click(button)

    expect(getByRole('dialog')).toBeTruthy()
    expect(getByText('Some contents...')).toBeTruthy()
  })
})

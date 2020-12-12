import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Default } from './Rate.stories'

describe('Rate', () => {
  it('should render with role', () => {
    render(<Default />)

    const stars = screen.getAllByRole('radio')

    expect(stars).toHaveLength(5)
    expect(screen.getAllByRole('radio', { checked: true })).toHaveLength(2)

    fireEvent.click(stars[3])

    expect(screen.getAllByRole('radio', { checked: true })).toHaveLength(4)
  })
})

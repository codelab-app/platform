import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Divider.stories'

describe('Divider', () => {
  it('should render with text and separator', () => {
    const { getAllByText, getByRole } = render(<Default />)

    expect(getAllByText(/Lorem ipsum dolor+/)).toBeTruthy()
    expect(getByRole('separator')).toBeTruthy()
  })
})

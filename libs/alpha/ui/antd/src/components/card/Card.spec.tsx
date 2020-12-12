import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Card.stories'

describe('Card', () => {
  it('should render with text', () => {
    const { getByText, getAllByText } = render(<Default />)

    expect(getByText('Card Title')).toBeTruthy()
    expect(getAllByText('Content')).toHaveLength(2)
    expect(getByText('Euro Street beat')).toBeTruthy()
    expect(getByText('www.instagram.com')).toBeTruthy()
  })
})

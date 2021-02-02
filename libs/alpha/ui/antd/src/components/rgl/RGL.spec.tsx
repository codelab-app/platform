import { render } from '@testing-library/react'
import React from 'react'
import { Default, ResponsiveGrid } from './RGL.stories'

describe('Grid', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('A')).toBeTruthy()
    expect(getByText('B')).toBeTruthy()
    expect(getByText('C')).toBeTruthy()
  })
})

describe('Responsive grid', () => {
  it('should render with text', () => {
    const { getByText } = render(<ResponsiveGrid />)

    expect(getByText('A')).toBeTruthy()
    expect(getByText('B')).toBeTruthy()
    expect(getByText('C')).toBeTruthy()
  })
})

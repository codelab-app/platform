import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Steps.stories'

describe('Steps', () => {
  it('should render with text', () => {
    const { getByText, getAllByText } = render(<Default />)

    expect(getByText('Step 1')).toBeTruthy()
    expect(getByText('Step 2')).toBeTruthy()
    expect(getByText('Step 3')).toBeTruthy()
    expect(getAllByText('This is a description.')).toHaveLength(3)
  })
})

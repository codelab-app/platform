import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Input.stories'

describe('Input', () => {
  it('should render with placeholder', () => {
    const { getByPlaceholderText } = render(<Default />)

    expect(getByPlaceholderText('Input here')).toBeTruthy()
  })
})

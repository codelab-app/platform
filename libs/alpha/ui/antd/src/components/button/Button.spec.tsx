import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Button.stories'

describe('Button', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Click me')).toBeTruthy()
  })
})

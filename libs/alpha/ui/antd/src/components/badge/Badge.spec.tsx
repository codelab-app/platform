import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Badge.stories'

describe('Badge', () => {
  it('should render with text', () => {
    const { getByTitle } = render(<Default />)

    expect(getByTitle('5')).toBeTruthy()
  })
})

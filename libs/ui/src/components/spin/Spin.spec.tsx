import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Spin.stories'

describe('Spin', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Loading')).toBeTruthy()
  })
})

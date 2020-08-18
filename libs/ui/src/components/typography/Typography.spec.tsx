import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Typography.stories'

describe('Typography', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Introduction')).toBeTruthy()
    expect(getByText(/Ant Design+/)).toBeTruthy()
    expect(getByText(/uniform the user interface specs+/)).toBeTruthy()
  })
})

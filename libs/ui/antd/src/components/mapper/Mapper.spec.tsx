import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Mapper.stories'

describe('Mapper', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Webber')).toBeTruthy()
    expect(getByText('Alex')).toBeTruthy()
    expect(getByText('Vien')).toBeTruthy()
  })
})

import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Empty.stories'

describe('Empty', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('No Data')).toBeTruthy()
  })
})

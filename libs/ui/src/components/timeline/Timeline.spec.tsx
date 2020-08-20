import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Timeline.stories'

describe('Timeline', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Create a services site 2015-09-01')).toBeTruthy()
    expect(getByText('Solve initial network problems 2015-09-01')).toBeTruthy()
    expect(getByText('Technical testing 2015-09-01')).toBeTruthy()
    expect(getByText('Network problems being solved 2015-09-01')).toBeTruthy()
  })
})

import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Statistic.stories'

describe('Statistic', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Active Users')).toBeTruthy()
    expect(getByText('545,465')).toBeTruthy()
  })
})

import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Result.stories'

describe('Result', () => {
  it('should render with text', () => {
    const { getByText, getByLabelText } = render(<Default />)

    expect(getByText('Your operation has been executed')).toBeTruthy()
    expect(getByText('Go Console')).toBeTruthy()
    expect(getByLabelText('exclamation-circle')).toBeTruthy()
  })
})

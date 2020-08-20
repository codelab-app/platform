import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Avatar.stories'

describe('Avatar', () => {
  it('should render with text and icon', () => {
    const { getByLabelText } = render(<Default />)

    expect(getByLabelText('user')).toBeTruthy()
  })
})

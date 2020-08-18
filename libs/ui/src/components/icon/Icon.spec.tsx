import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Icon.stories'

describe('Icon', () => {
  it('should render with icon', () => {
    const { getByLabelText } = render(<Default />)

    expect(getByLabelText('home')).toBeTruthy()
  })
})

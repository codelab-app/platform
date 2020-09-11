import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Slider.stories'

describe('Slider', () => {
  it('should render with text', () => {
    const { getByRole } = render(<Default />)

    expect(getByRole('slider')).toBeTruthy()
  })
})

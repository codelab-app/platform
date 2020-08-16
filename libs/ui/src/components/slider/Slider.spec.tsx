import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Slider.story'

describe('Slider', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Slider')).toBeTruthy()
  })
})

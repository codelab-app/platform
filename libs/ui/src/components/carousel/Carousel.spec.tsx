import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Carousel.stories'

describe('Carousel', () => {
  it('should render with text', () => {
    const { getAllByText, getByText } = render(<Default />)

    // Slide test
    expect(getAllByText('Slide 1')).toHaveLength(2)
    expect(getAllByText('Slide 2')).toHaveLength(2)
    expect(getAllByText('Slide 3')).toHaveLength(3)

    // Dot test
    expect(getByText('1')).toBeTruthy()
    expect(getByText('2')).toBeTruthy()
    expect(getByText('3')).toBeTruthy()

    expect(getByText('1').parentElement).toHaveClass('slick-active')
  })
})

import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Default } from './Comment.stories'

describe('Comment', () => {
  it('should render with text', () => {
    const { getByText, getByAltText, getByLabelText, getAllByText } = render(
      <Default />,
    )

    expect(getByText('Han Solo')).toBeTruthy()
    expect(getByText('1 July 2020')).toBeTruthy()
    expect(getByText(/We supply a series of design principles+/)).toBeTruthy()
    expect(getByAltText('Han Solo')).toBeTruthy()
    expect(getByText('Reply to')).toBeTruthy()
    expect(getByLabelText('like')).toBeTruthy()
    expect(getByLabelText('dislike')).toBeTruthy()
    expect(getByLabelText('like')).toHaveAttribute('theme', 'outlined')
    expect(getByLabelText('dislike')).toHaveAttribute('theme', 'outlined')
  })

  it('should work with like and dislike', () => {
    const { getByText, getByLabelText } = render(<Default />)

    fireEvent.click(getByLabelText('like'))

    expect(getByLabelText('like')).toHaveAttribute('theme', 'filled')
    expect(getByLabelText('dislike')).toHaveAttribute('theme', 'outlined')

    fireEvent.click(getByLabelText('dislike'))

    expect(getByLabelText('like')).toHaveAttribute('theme', 'outlined')
    expect(getByLabelText('dislike')).toHaveAttribute('theme', 'filled')
  })
})

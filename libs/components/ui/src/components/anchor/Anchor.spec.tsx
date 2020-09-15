import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Default } from './Anchor.stories'

describe('Anchor', () => {
  it('should render with text', () => {
    const { getAllByText } = render(<Default />)

    expect(getAllByText('1')).toHaveLength(2)
    expect(getAllByText('2')).toHaveLength(2)
    expect(getAllByText('3')).toHaveLength(2)
    expect(getAllByText(/Lorem ipsum dolor+/)).toHaveLength(3)
    const text1 = getAllByText('1')
    const text2 = getAllByText('2')
    const text3 = getAllByText('3')

    expect(text1[0]).toHaveAttribute('href', '#1')
    expect(text2[0]).toHaveAttribute('href', '#2')
    expect(text3[0]).toHaveAttribute('href', '#3')

    fireEvent.click(text2[0])

    expect(text2[0].parentElement).toHaveClass('ant-anchor-link-active')
  })
})

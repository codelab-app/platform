import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Default } from './Tag.stories'

describe('Tag', () => {
  it('should render with text', () => {
    const { getByText, getByLabelText } = render(<Default />)

    expect(getByText('Tag 1')).toBeTruthy()
    expect(getByLabelText('close')).toBeTruthy()
  })

  it('should close on close button', () => {
    const { getByText, getByLabelText } = render(<Default />)

    fireEvent.click(getByLabelText('close'))

    expect(getByText('Tag 1')).toHaveClass('ant-tag-hidden')
  })
})

import { render } from '@testing-library/react'
import React from 'react'
import { ComponentSize } from './ConfigProvider.stories'

describe('ConfigProvider', () => {
  it('should render with large size', () => {
    const { getByText, getByTitle, getByPlaceholderText } = render(
      <ComponentSize />,
    )

    expect(getByPlaceholderText('Input')).toHaveClass('ant-input-lg')
    expect(getByTitle('Demo').parentElement?.parentElement).toHaveClass(
      'ant-select-lg',
    )
    expect(
      getByPlaceholderText('Select date').parentElement?.parentElement,
    ).toHaveClass('ant-picker-large')
    expect(getByText('Button')).toHaveClass('ant-btn-lg')
  })
})

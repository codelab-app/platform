import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Default } from './Popconfirm.stories'

describe('Popconfirm', () => {
  it('should render with text', () => {
    const { getByText, getByRole } = render(<Default />)

    expect(getByText('Delete')).toBeTruthy()

    fireEvent.click(getByText('Delete'))

    expect(getByRole('tooltip')).toBeTruthy()
    expect(getByText('Are you sure？')).toBeTruthy()
    expect(getByText('OK')).toBeTruthy()
    expect(getByText('Cancel')).toBeTruthy()
  })
})

import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './InputNumber.stories'

describe('InputNumber', () => {
  it('should render with role', () => {
    const { getByRole } = render(<Default />)

    expect(getByRole('spinbutton')).toBeTruthy()
    expect(getByRole('spinbutton')).toHaveValue('3')
  })
})

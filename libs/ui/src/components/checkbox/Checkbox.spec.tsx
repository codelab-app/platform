import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Checkbox.stories'

describe('Checkbox', () => {
  it('should render with label text', () => {
    const { getByLabelText } = render(<Default />)

    expect(getByLabelText('Checkbox')).toBeTruthy()
  })
})

import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Space.stories'

describe('Space', () => {
  it('should render with text with margin style', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Primary')).toBeTruthy()
    expect(getByText('Default')).toBeTruthy()
    expect(getByText('Dashed')).toBeTruthy()

    expect(getByText('Primary').parentElement).toHaveStyle({
      marginRight: '16px',
    })
    expect(getByText('Default').parentElement).toHaveStyle({
      marginRight: '16px',
    })
  })
})

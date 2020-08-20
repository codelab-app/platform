import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Progress.stories'

describe('Progress', () => {
  it('should render with text and style', () => {
    const { getByText } = render(<Default />)

    expect(getByText('30%')).toBeTruthy()
    expect(document.querySelector('.ant-progress-bg')).toHaveStyle({
      width: '30%',
    })
  })
})

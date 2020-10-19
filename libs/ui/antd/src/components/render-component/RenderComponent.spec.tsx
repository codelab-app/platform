import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './RenderComponent.stories'

describe('RenderComponent', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Data')).toBeTruthy()
  })
})

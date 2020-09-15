import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Default } from './Tabs.stories'

describe('Tabs', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Tab 1')).toBeTruthy()
    expect(getByText('Tab 2')).toBeTruthy()
    expect(getByText('Tab 3')).toBeTruthy()
    expect(getByText('Content of Tab pane 1')).toBeTruthy()

    fireEvent.click(getByText('Tab 2'))

    expect(getByText('Content of Tab pane 2')).toBeTruthy()
  })
})

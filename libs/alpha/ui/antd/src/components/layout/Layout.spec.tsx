import { render } from '@testing-library/react'
import React from 'react'
import { Default, Layout } from './Layout.stories'

describe('Layout', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Option 1')).toBeTruthy()
    expect(getByText('Option 2')).toBeTruthy()
    expect(getByText('nav 1')).toBeTruthy()
    expect(getByText('nav 2')).toBeTruthy()
    expect(getByText('nav 3')).toBeTruthy()
    expect(getByText('Content')).toBeTruthy()
    expect(getByText('Footer')).toBeTruthy()
  })

  it('should render with text', () => {
    const { getByText } = render(<Layout />)

    expect(getByText('Option 1')).toBeTruthy()
    expect(getByText('Option 2')).toBeTruthy()
    expect(getByText('Option 3')).toBeTruthy()
    expect(getByText('nav 1')).toBeTruthy()
    expect(getByText('nav 2')).toBeTruthy()
    expect(getByText('nav 3')).toBeTruthy()
    expect(getByText('Content')).toBeTruthy()
    expect(getByText('This is paragraph')).toBeTruthy()
    expect(getByText('Footer')).toBeTruthy()
  })
})

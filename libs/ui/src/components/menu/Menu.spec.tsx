import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { Default } from './Menu.stories'

describe('Menu', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Navigation One')).toBeTruthy()
    expect(getByText('Item 1')).toBeTruthy()
    expect(getByText('Option 1')).toBeTruthy()
    expect(getByText('Option 2')).toBeTruthy()
    expect(getByText('Item 2')).toBeTruthy()
    expect(getByText('Option 3')).toBeTruthy()
    expect(getByText('Option 4')).toBeTruthy()
    expect(getByText('Navigation Two')).toBeTruthy()

    fireEvent.click(getByText('Navigation Two'))

    expect(getByText('Option 5')).toBeTruthy()
    expect(getByText('Option 6')).toBeTruthy()
    expect(getByText('Submenu')).toBeTruthy()

    fireEvent.click(getByText('Submenu'))

    expect(getByText('Option 7')).toBeTruthy()
    expect(getByText('Option 8')).toBeTruthy()
  })
})

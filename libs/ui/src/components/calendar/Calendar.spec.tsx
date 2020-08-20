import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { Default } from './Calendar.stories'

describe('Calendar', () => {
  const today = new Date()
  const year = today.getFullYear().toString()
  const month = today.toLocaleDateString('en-GB', {
    month: 'short',
  })
  const numericMonth = today.toLocaleDateString('en-GB', {
    month: '2-digit',
  })
  const date = today.getDate().toString()

  it('should render with text in Month mode', () => {
    const { getByTitle, getByLabelText } = render(<Default />)

    expect(getByTitle(year)).toBeTruthy()
    expect(getByTitle(month)).toBeTruthy()
    expect(getByTitle(`${year}-${numericMonth}-${date}`)).toBeTruthy()

    expect(getByLabelText('Month')).toBeTruthy()
    expect(getByLabelText('Year')).toBeTruthy()
  })

  it('should render with text in Year mode', () => {
    const { getByText, getByLabelText } = render(<Default />)

    fireEvent.click(getByLabelText('Year'))

    expect(getByText('Jan')).toBeTruthy()
    expect(getByText('Feb')).toBeTruthy()
    expect(getByText('Mar')).toBeTruthy()
    expect(getByText(month)).toBeTruthy()
    expect(getByText('Oct')).toBeTruthy()
    expect(getByText('Nov')).toBeTruthy()
    expect(getByText('Dec')).toBeTruthy()
  })
})

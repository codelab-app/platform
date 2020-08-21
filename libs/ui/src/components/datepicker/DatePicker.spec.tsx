import { render, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './DatePicker.stories'

describe('DatePicker', () => {
  it('should render with placeholder', async () => {
    const {
      getByPlaceholderText,
      getByText,
      getByLabelText,
      getByTitle,
    } = render(<Default />)
    const input = getByPlaceholderText('Select date')

    expect(input).toBeTruthy()

    const today = new Date()
    const year = today.getFullYear().toString()
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
      today,
    )

    fireEvent.mouseDown(getByLabelText('calendar'))
    fireEvent.mouseUp(getByLabelText('calendar'))

    await waitFor(() => expect(getByText(year)).toBeTruthy())
    await waitFor(() => expect(getByText(month)).toBeTruthy())

    fireEvent.click(getByTitle(today.toISOString().slice(0, 10)))

    expect(input).toHaveValue(today.toISOString().slice(0, 10))
  })
})

import { render, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './TimePicker.stories'

describe('TimePicker', () => {
  it('should render with placeholder', async () => {
    const {
      getByPlaceholderText,
      getByLabelText,
      getAllByText,
      getByText,
    } = render(<Default />)

    expect(getByPlaceholderText('Select time')).toBeTruthy()
    expect(getByLabelText('clock-circle')).toBeTruthy()

    const input = getByPlaceholderText('Select time')
    const icon = getByLabelText('clock-circle')

    fireEvent.mouseDown(icon)
    fireEvent.mouseUp(icon)

    await waitFor(() => {
      expect(getAllByText('00')).toHaveLength(3)
      expect(getAllByText('01')).toHaveLength(3)
      expect(getAllByText('02')).toHaveLength(3)
    })

    fireEvent.click(getAllByText('00')[0])
    fireEvent.click(getAllByText('01')[1])
    fireEvent.click(getAllByText('02')[2])
    fireEvent.click(getByText('Ok'))

    await waitFor(() => expect(input).toHaveValue('00:01:02'))
  })
})

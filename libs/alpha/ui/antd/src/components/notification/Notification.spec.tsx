import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './Notification.stories'

describe('Notification', () => {
  it('should render with text', async () => {
    const { queryByLabelText, queryByText } = render(<Default />)

    expect(queryByText('Display notification')).toBeTruthy()

    fireEvent.click(queryByText('Display notification')!)

    await waitFor(() => {
      expect(queryByText('Notification Title')).toBeTruthy()
      expect(
        queryByText('This is the content of the notification.'),
      ).toBeTruthy()
      expect(queryByLabelText('close')).toBeTruthy()
    })

    fireEvent.click(queryByLabelText('close')!)

    await waitFor(() => {
      expect(queryByText('Notification Title')).not.toBeTruthy()
      expect(
        queryByText('This is the content of the notification.'),
      ).not.toBeTruthy()
    })
  })
})

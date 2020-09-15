import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './AutoComplete.stories'

describe('AutoComplete', () => {
  it('should render with role', async () => {
    const { getByRole, getByText, getAllByRole } = render(<Default />)

    expect(getByRole('combobox')).toBeTruthy()

    const input = getByRole('combobox')

    fireEvent.change(input, { target: { value: 'a' } })

    await waitFor(() => {
      expect(getByText('aa')).toBeTruthy()
      expect(getByText('aaa')).toBeTruthy()
    })

    fireEvent.click(getByText('aaa'))

    await waitFor(() => expect(input).toHaveValue('aaa'))
  })
})

import { render, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './Select.stories'

describe('Select', () => {
  it('should render with text', async () => {
    const { getByText } = render(<Default />)

    expect(getByText('A')).toBeTruthy()

    fireEvent.mouseDown(getByText('A').parentElement)

    await waitFor(() => expect(getByText('B')).toBeInTheDocument())
    await waitFor(() => expect(getByText('C')).toBeInTheDocument())
  })
})

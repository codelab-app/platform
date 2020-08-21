import { render, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './TreeSelect.stories'

describe('TreeSelect', () => {
  it('should render with text', async () => {
    const { getByText, getAllByText } = render(<Default />)

    expect(getByText('Please select')).toBeTruthy()

    fireEvent.mouseDown(getByText('Please select').parentElement)

    await waitFor(() => {
      expect(getByText('parent 1')).toBeInTheDocument()
      expect(getByText('parent 1-0')).toBeInTheDocument()
      expect(getByText('leaf1')).toBeInTheDocument()
      expect(getByText('leaf2')).toBeInTheDocument()
      expect(getByText('parent 1-1')).toBeInTheDocument()
      expect(getByText('sss')).toBeInTheDocument()
    })

    fireEvent.click(getByText('leaf2'))

    expect(getAllByText('leaf2')).toHaveLength(2)
  })
})

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
      expect(getByText('leaf 1')).toBeInTheDocument()
      expect(getByText('leaf 2')).toBeInTheDocument()
      expect(getByText('parent 1-1')).toBeInTheDocument()
      expect(getByText('leaf 1-1 1')).toBeInTheDocument()
    })

    fireEvent.click(getByText('leaf 2'))

    expect(
      document.getElementsByClassName('ant-select-selection-item')[0],
    ).toHaveTextContent('leaf 2')
    // Screen reader attaches extra node depending on context
    // expect(getAllByText('leaf 2')).toHaveLength(2)
  })
})

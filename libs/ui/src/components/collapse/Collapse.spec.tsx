import { render, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './Collapse.stories'

describe('Collapse', () => {
  it('should render with text', async () => {
    const { getByText, queryByText } = render(<Default />)

    expect(getByText('This is panel header 1')).toBeTruthy()
    expect(getByText('This is panel header 2')).toBeTruthy()
    expect(getByText('This is panel header 3')).toBeTruthy()

    expect(getByText('This is panel text 1')).toBeTruthy()
    expect(queryByText('This is panel text 2')).not.toBeTruthy()

    fireEvent.click(getByText('This is panel header 1'))

    await waitFor(() =>
      expect(getByText('This is panel text 1').parentElement).toHaveClass(
        'ant-collapse-content-inactive',
      ),
    )

    fireEvent.click(getByText('This is panel header 2'))

    await waitFor(() =>
      expect(getByText('This is panel text 2').parentElement).toHaveClass(
        'ant-collapse-content-active',
      ),
    )
  })
})

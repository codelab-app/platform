import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './Breadcrumb.stories'

describe('Breadcrumb', () => {
  it('should render with text', () => {
    const { getByText, getByRole } = render(<Default />)

    expect(getByText('Home')).toBeTruthy()
    expect(getByText('Application Center')).toBeTruthy()
    expect(getByText('Application List')).toBeTruthy()
    expect(getByText('An Application')).toBeTruthy()
  })

  it('item should work with overlay', async () => {
    const { getByText, getByRole } = render(<Default />)
    const text = getByText('Application List')

    fireEvent.mouseOver(text)
    await waitFor(() => {
      expect(getByRole('menu')).toBeInTheDocument()
      expect(getByText('Detail 1')).toBeInTheDocument()
      expect(getByText('Detail 2')).toBeInTheDocument()
    })

    fireEvent.mouseOut(text)
    await waitFor(() => expect(getByRole('menu')).not.toBeVisible())
  })
})

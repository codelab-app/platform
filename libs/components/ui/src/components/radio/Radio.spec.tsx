import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './Radio.stories'

describe('Radio', () => {
  it('should render with label', () => {
    const { getByLabelText } = render(<Default />)

    expect(getByLabelText('A')).toBeTruthy()
    expect(getByLabelText('B')).toBeTruthy()
    expect(getByLabelText('C')).toBeTruthy()
    expect(getByLabelText('D')).toBeTruthy()

    expect(getByLabelText('A').parentElement).toHaveClass('ant-radio-checked')
  })

  it('can select other option', async () => {
    const { getByLabelText } = render(<Default />)

    fireEvent.click(getByLabelText('B'))

    await waitFor(() =>
      expect(getByLabelText('B').parentElement).toHaveClass(
        'ant-radio-checked',
      ),
    )
  })
})

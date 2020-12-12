import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Alert.stories'

describe('Alert', () => {
  it('should render with text and label', () => {
    const { getByText, getByLabelText } = render(<Default />)

    expect(getByText('Success Tips')).toBeTruthy()
    expect(
      getByText(
        'Detailed description and advice about successful copywriting.',
      ),
    ).toBeTruthy()
    expect(getByLabelText('check-circle')).toBeTruthy()
  })
})

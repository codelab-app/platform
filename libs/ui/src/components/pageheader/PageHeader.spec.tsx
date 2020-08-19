import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './PageHeader.stories'

describe('PageHeader', () => {
  it('should render with titles and label', () => {
    const { getByTitle, getByLabelText } = render(<Default />)

    expect(getByTitle('Title')).toBeTruthy()
    expect(getByTitle('This is a subtitle')).toBeTruthy()
    expect(getByLabelText('Back')).toBeTruthy()
  })
})

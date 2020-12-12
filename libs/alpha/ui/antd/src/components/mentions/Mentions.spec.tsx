import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Default } from './Mentions.stories'

describe('Mentions', () => {
  it('should render with text', () => {
    const { getByPlaceholderText } = render(<Default />)
    const input = getByPlaceholderText('You can use @ to ref user here')

    expect(input).toBeTruthy()
    expect(input).toHaveValue('@afc163')

    userEvent.clear(input)
    userEvent.type(input, '@')

    expect(screen.getByText('afc163')).toBeTruthy()
    expect(screen.getByText('zombieJ')).toBeTruthy()
    expect(screen.getByText('yesmeck')).toBeTruthy()
  })
})

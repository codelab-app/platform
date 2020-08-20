import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './List.stories'

describe('List', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Header')).toBeTruthy()
    expect(getByText('Footer')).toBeTruthy()
    expect(getByText('Racing car sprays burning fuel into crowd.')).toBeTruthy()
    expect(getByText('Japanese princess to wed commoner.')).toBeTruthy()
    expect(
      getByText('Australian walks 100km after outback crash.'),
    ).toBeTruthy()
    expect(getByText('Man charged over missing wedding girl.')).toBeTruthy()
    expect(getByText('Los Angeles battles huge wildfires.')).toBeTruthy()
  })
})

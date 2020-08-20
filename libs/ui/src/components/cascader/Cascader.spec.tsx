import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { Default } from './Cascader.stories'

describe('Cascader', () => {
  it('should render with placeholder', () => {
    const { getByText, getByPlaceholderText } = render(<Default />)
    const input = getByPlaceholderText('Please select')

    expect(input).toBeTruthy()

    fireEvent.click(input.parentElement)

    expect(getByText('Zhejiang')).toBeTruthy()
    expect(getByText('Jiangsu')).toBeTruthy()

    fireEvent.click(getByText('Zhejiang'))

    expect(getByText('Hangzhou')).toBeTruthy()

    fireEvent.click(getByText('Hangzhou'))

    expect(getByText('West Lake')).toBeTruthy()

    fireEvent.click(getByText('West Lake'))

    expect(getByText('Zhejiang / Hangzhou / West Lake')).toBeTruthy()
  })
})

import { render, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import { Default } from './Table.stories'

afterEach(cleanup)

describe('Table', () => {
  let consoleOutput = ''

  const mockedLog = (output: string) => {
    consoleOutput = output
  }

  // eslint-disable-next-line no-console
  console.log = mockedLog

  it('should render with text', () => {
    const { getByText, getAllByText } = render(<Default />)

    expect(getByText('Name')).toBeTruthy()
    expect(getByText('Age')).toBeTruthy()
    expect(getByText('Address')).toBeTruthy()
    expect(getByText('Action')).toBeTruthy()
    expect(getByText('Mike')).toBeTruthy()
    expect(getByText('32')).toBeTruthy()
    expect(getByText('John')).toBeTruthy()
    expect(getByText('42')).toBeTruthy()
    expect(getAllByText('10 Downing Street')).toHaveLength(2)
    expect(getAllByText('Edit')).toHaveLength(2)
    expect(getAllByText('Delete')).toHaveLength(2)

    fireEvent.click(getAllByText('Delete')[0])

    expect(consoleOutput).toBe('Mike')
  })
})

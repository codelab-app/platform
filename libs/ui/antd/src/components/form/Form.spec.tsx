import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import {
  ConditionalForm,
  CustomForm,
  Default,
  ObjectForm,
} from './Form.stories'

afterEach(cleanup)

describe('Form', () => {
  it('should render with labels', () => {
    const { getByText, getByLabelText } = render(<Default />)

    expect(getByLabelText('ID')).toBeTruthy()
    expect(getByLabelText('Checkbox')).toBeTruthy()
    expect(getByLabelText('Select')).toBeTruthy()
    expect(getByLabelText('Username')).toBeTruthy()
    expect(getByLabelText('Email')).toBeTruthy()
    expect(getByText('Submit')).toBeTruthy()

    const addButton = getByText('Add')

    expect(addButton).toBeTruthy()

    fireEvent.click(addButton)

    expect(getByLabelText('Name')).toBeTruthy()
    expect(getByLabelText('Type')).toBeTruthy()
  })

  it('should render objects with default values', () => {
    const { getByDisplayValue } = render(<ObjectForm />)

    expect(getByDisplayValue('Codelab').id).toBe('company_name')
    expect(getByDisplayValue('USA').id).toBe('company_address_country')
    expect(getByDisplayValue('Los Angeles').id).toBe('company_address_city')
    expect(getByDisplayValue('Webber').id).toBe('company_devs_0_name')
    expect(getByDisplayValue('Vien').id).toBe('company_devs_1_name')
  })

  it('should render conditional form field', async () => {
    const { getByText, getByLabelText, queryByLabelText, getByRole } = render(
      <ConditionalForm />,
    )

    expect(getByLabelText('Select Type')).toBeTruthy()
    expect(queryByLabelText('Field A')).toBeFalsy()
    expect(queryByLabelText('Field B')).toBeFalsy()
    expect(queryByLabelText('Field C')).toBeFalsy()

    fireEvent.mouseDown(getByRole('combobox').parentElement)

    await waitFor(() => {
      expect(getByText('A')).toBeInTheDocument()
      expect(getByText('B')).toBeInTheDocument()
      expect(getByText('C')).toBeInTheDocument()
    })

    fireEvent.click(getByText('A'))

    expect(queryByLabelText('Field A')).toBeTruthy()
    expect(queryByLabelText('Field B')).toBeFalsy()
    expect(queryByLabelText('Field C')).toBeFalsy()
  })

  let consoleOutput = ''

  const mockedLog = (output: string) => {
    consoleOutput = output
  }

  // eslint-disable-next-line no-console
  console.log = mockedLog

  it('should return mapped values on finish', async () => {
    const { getByText, getByLabelText, getAllByLabelText } = render(
      <CustomForm />,
    )

    fireEvent.click(getByText('Submit'))

    await waitFor(() =>
      expect(consoleOutput).toBe(
        JSON.stringify({
          id: '1',
          info: {
            user: {
              address: { number: '1200', street: 'Park ave.', city: 'London' },
            },
          },
        }),
      ),
    )
  })
})

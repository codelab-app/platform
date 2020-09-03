import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { Default, ObjectForm } from './Form.stories'

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
    const { getByText, getByLabelText, getByDisplayValue } = render(
      <ObjectForm />,
    )

    expect(getByDisplayValue('Codelab').id).toBe('company_name')
    expect(getByDisplayValue('USA').id).toBe('company_address_country')
    expect(getByDisplayValue('Los Angeles').id).toBe('company_address_city')
    expect(getByDisplayValue('Webber').id).toBe('company_devs_0_name')
    expect(getByDisplayValue('Vien').id).toBe('company_devs_1_name')
  })
})

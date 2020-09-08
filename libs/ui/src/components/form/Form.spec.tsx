import { render, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { Default, ObjectForm, ConditionalForm } from './Form.stories'

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
    const { getByText, getByLabelText, getByRole } = render(<ConditionalForm />)

    expect(getByLabelText('Select')).toBeTruthy()

    const fieldA = getByText('Field A').parentElement.parentElement
    const fieldB = getByText('Field B').parentElement.parentElement
    const fieldC = getByText('Field C').parentElement.parentElement

    expect(fieldA).toHaveClass('ant-form-item-hidden')
    expect(fieldB).toHaveClass('ant-form-item-hidden')
    expect(fieldC).toHaveClass('ant-form-item-hidden')

    fireEvent.mouseDown(getByRole('combobox').parentElement)

    await waitFor(() => {
      expect(getByText('A')).toBeInTheDocument()
      expect(getByText('B')).toBeInTheDocument()
      expect(getByText('C')).toBeInTheDocument()
    })

    fireEvent.click(getByText('A'))

    expect(fieldA).not.toHaveClass('ant-form-item-hidden')
    expect(fieldB).toHaveClass('ant-form-item-hidden')
    expect(fieldC).toHaveClass('ant-form-item-hidden')
  })
})

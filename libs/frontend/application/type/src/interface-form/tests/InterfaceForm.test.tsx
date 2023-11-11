/* eslint-disable unicorn/filename-case */
import '@testing-library/jest-dom'
import { act, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { InterfaceForm } from '../InterfaceForm'
import { interfaceWithEnumField } from './setup-store'

describe('InterfaceForm', () => {
  test('interface form select enum field value', async () => {
    const mockSubmit = jest.fn()

    const { container } = render(
      <InterfaceForm
        interfaceType={interfaceWithEnumField}
        model={{}}
        onChange={mockSubmit}
        onChangeModel={mockSubmit}
        onSubmit={mockSubmit}
        submitField={React.Fragment}
      />,
    )

    // Check enumField is rendered
    expect(container.querySelector(`[name="enumField"]`)).toBeInTheDocument()

    // Check enumField has the correct initial value
    expect(
      container.querySelector('.ant-select-selection-item[title="Enum 1"]'),
    ).toHaveTextContent('Enum 1')

    const enumSelectElement = container.querySelector(
      '[name="enumField"] .ant-select-selector',
    )

    expect(enumSelectElement).toBeInTheDocument()

    // Click on the selector
    await act(() => userEvent.click(enumSelectElement!))

    // Select the second option
    const dropdownOption = container.querySelector(
      '.ant-select-item-option[title="Enum 2"]',
    )

    await waitFor(() => expect(dropdownOption).toBeVisible())

    await act(() => userEvent.click(dropdownOption!))

    // Check the value has been updated
    expect(
      container.querySelector('.ant-select-selection-item[title="Enum 2"]'),
    ).toHaveTextContent('Enum 2')

    // Check the submit handler has been called
    expect(mockSubmit).toHaveBeenCalledWith('enumField', 'Enum 2')
  })
})

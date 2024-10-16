/* eslint-disable unicorn/filename-case */
import { Validator } from '@codelab/shared/infra/schema'
import { act, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { debug } from 'console'
import { Fragment } from 'react'

import { InterfaceForm } from '../InterfaceForm'
import {
  interfaceWithEnumField,
  interfaceWithUnionField,
  intType,
  stringType,
} from './setup-store'

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
        submitField={Fragment}
      />,
    )

    // Check enumField is rendered
    expect(container.querySelector('[name="enumField"]')).toBeInTheDocument()

    // Check enumField has the correct initial value
    expect(
      container.querySelector('.ant-select-selection-item[title="Enum 1"]'),
    ).toHaveTextContent('Enum 1')

    const enumSelectElement = container.querySelector(
      '[name="enumField"] .ant-select-selector',
    )

    expect(enumSelectElement).toBeInTheDocument()

    Validator.assertsDefined(enumSelectElement)

    // Click on the selector
    await act(() => userEvent.click(enumSelectElement))

    // Select the second option
    const dropdownOption = container.querySelector(
      '.ant-select-item-option[title="Enum 2"]',
    )

    await waitFor(() => expect(dropdownOption).toBeVisible())

    Validator.assertsDefined(dropdownOption)

    await act(() => userEvent.click(dropdownOption))

    // Check the value has been updated
    expect(
      container.querySelector('.ant-select-selection-item[title="Enum 2"]'),
    ).toHaveTextContent('Enum 2')

    // Check the submit handler has been called
    expect(mockSubmit).toHaveBeenCalledWith('enumField', 'Enum 2')
  })

  test('interface form select union type of string and number', async () => {
    const mockSubmit = jest.fn()

    const { container, getByTestId } = render(
      <InterfaceForm
        interfaceType={interfaceWithUnionField}
        model={{}}
        onChange={mockSubmit}
        onChangeModel={mockSubmit}
        onSubmit={mockSubmit}
        submitField={Fragment}
      />,
    )

    debug()
    // Check unionField is rendered
    expect(
      container.querySelector('[name="unionField.type"]'),
    ).toBeInTheDocument()

    const selectUnionTypeElement = container.querySelector(
      '[name="unionField.type"] .ant-select-selector',
    )

    expect(selectUnionTypeElement).toBeInTheDocument()

    Validator.assertsDefined(selectUnionTypeElement)

    // Click on the type selector
    await act(() => userEvent.click(selectUnionTypeElement))

    //
    // Select the IntType option
    // NOTE: need to use document here because the select dropdown is
    // rendered in a portal. So container doesn't work.
    const intTypeOption = document.querySelector(
      `.ant-select-item.ant-select-item-option[title="${intType.name}"]`,
    )

    Validator.assertsDefined(intTypeOption)

    expect(intTypeOption).toBeInTheDocument()

    await act(() => userEvent.click(intTypeOption))

    // Check the selected type has been updated
    expect(
      container.querySelector('.ant-select-selection-item'),
    ).toHaveTextContent(intType.name)

    expect(mockSubmit).toHaveBeenCalledWith('unionField', {
      kind: intType.kind,
      type: intType.id,
    })

    // Update value field
    const valueField = getByTestId('unionField.value')

    expect(valueField).toBeInTheDocument()

    await act(() => userEvent.type(valueField, '123'))

    // Check the value has been updated
    expect(valueField).toHaveValue('123')

    // Select String type option
    await act(() => userEvent.click(selectUnionTypeElement))

    const stringTypeOption = document.querySelector(
      `.ant-select-item.ant-select-item-option[title="${stringType.name}"]`,
    )

    Validator.assertsDefined(stringTypeOption)

    expect(stringTypeOption).toBeInTheDocument()

    await act(() => userEvent.click(stringTypeOption))

    expect(
      container.querySelector('.ant-select-selection-item'),
    ).toHaveTextContent(stringType.name)

    expect(mockSubmit).toHaveBeenCalledWith('unionField', {
      kind: 'PrimitiveType',
      type: stringType.id,
    })
  })
})

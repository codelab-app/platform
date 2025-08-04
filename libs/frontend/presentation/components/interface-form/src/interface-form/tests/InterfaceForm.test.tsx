import { typedProp } from '@codelab/frontend-abstract-domain'
import { ExpressionAutoFields } from '@codelab/frontend-presentation-components-form'
import { ITypeKind } from '@codelab/shared-abstract-core'
import { Validator } from '@codelab/shared-infra-typebox'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
      >
        <ExpressionAutoFields />
      </InterfaceForm>,
    )

    // Check enumField is rendered
    expect(container.querySelector('[label="Enum field"]')).toBeInTheDocument()
    expect(container.querySelector('[role="combobox"]')).toBeInTheDocument()

    // Check enumField has the correct initial value
    expect(
      container.querySelector('.ant-select-selection-item[title="Enum 1"]'),
    ).toHaveTextContent('Enum 1')

    const enumSelectElement = container.querySelector('.ant-select-selector')

    expect(enumSelectElement).toBeInTheDocument()

    Validator.assertsDefined(enumSelectElement)

    // Click on the selector
    await userEvent.click(enumSelectElement)

    // Select the second option
    const dropdownOption = container.querySelector('[title="Enum 2"]')

    await waitFor(() => expect(dropdownOption).toBeVisible())

    Validator.assertsDefined(dropdownOption)

    await userEvent.click(dropdownOption)

    // Check the value has been updated
    expect(
      container.querySelector('.ant-select-selection-item[title="Enum 2"]'),
    ).toHaveTextContent('Enum 2')

    // Check the submit handler has been called
    expect(mockSubmit).toHaveBeenCalledWith('enumField', 'Enum 2')
  })

  test('interface form select union type of string and number', async () => {
    const mockSubmit = jest.fn()

    const { container } = render(
      <InterfaceForm
        interfaceType={interfaceWithUnionField}
        model={{}}
        onChange={mockSubmit}
        onChangeModel={mockSubmit}
        onSubmit={mockSubmit}
        submitField={Fragment}
      >
        <ExpressionAutoFields />
      </InterfaceForm>,
    )

    // Check unionField is rendered
    expect(container.querySelector('[title="Union field"]')).toBeInTheDocument()

    const selectUnionTypeElement = container.querySelector(
      '[name="unionField.type"] .ant-select-selector',
    )

    expect(selectUnionTypeElement).toBeInTheDocument()

    Validator.assertsDefined(selectUnionTypeElement)

    // Click on the type selector
    await userEvent.click(selectUnionTypeElement)

    //
    // Select the IntType option
    // NOTE: need to use document here because the select dropdown is
    // rendered in a portal. So container doesn't work.
    const intTypeOption = document.querySelector(
      `.ant-select-item.ant-select-item-option[title="${intType.name}"]`,
    )

    Validator.assertsDefined(intTypeOption)

    expect(intTypeOption).toBeInTheDocument()

    await userEvent.click(intTypeOption)

    // Check the selected type has been updated
    expect(
      container.querySelector('.ant-select-selection-item'),
    ).toHaveTextContent(intType.name)

    expect(mockSubmit).toHaveBeenCalledWith(
      'unionField',
      typedProp({ kind: intType.kind, type: intType.id }),
    )

    // Update value field
    const valueField = container.querySelector(
      `[name="unionField.${intType.id}"]`,
    )

    // const valueField = getByTestId('unionField.value')

    Validator.assertsDefined(valueField)

    expect(valueField).toBeInTheDocument()

    await userEvent.type(valueField, '123')

    // Check the value has been updated
    expect(valueField).toHaveValue(123)

    // Select String type option
    await userEvent.click(selectUnionTypeElement)

    const stringTypeOption = document.querySelector(
      `.ant-select-item.ant-select-item-option[title="${stringType.name}"]`,
    )

    Validator.assertsDefined(stringTypeOption)

    expect(stringTypeOption).toBeInTheDocument()

    await userEvent.click(stringTypeOption)

    expect(
      container.querySelector('.ant-select-selection-item'),
    ).toHaveTextContent(stringType.name)

    expect(mockSubmit).toHaveBeenCalledWith(
      'unionField',
      typedProp({
        kind: ITypeKind.PrimitiveType,
        type: stringType.id,
      }),
    )
  })
})

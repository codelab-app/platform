/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IFieldDefaultValue } from '@codelab/frontend/abstract/core'
import { createValidator, Form } from '@codelab/frontend/presentation/view'
import { usePrevious } from '@codelab/frontend/shared/utils'
import { Form as AntdForm } from 'antd'
import isNil from 'lodash/isNil'
import React, { useEffect } from 'react'
import type { Context } from 'uniforms'
import { joinName, useField } from 'uniforms'
import { AutoField, SelectField } from 'uniforms-antd'

export interface SelectUnionTypeValueProps {
  name: string
  value: {
    type: string
    value?: IFieldDefaultValue
  }
}

const makeSelectOptions = (oneOf: Array<any>) => {
  if (!oneOf.length) {
    return []
  }

  return oneOf.map((of) => ({
    label: of.typeName,
    value: of.properties.type.default,
  }))
}

const getTypeFromOneOf = (oneOf: Array<any>, typeId: string) => {
  if (!typeId) {
    return oneOf[0]
  }

  return oneOf.find((of: any) => of.properties.type.default === typeId)
}

/*
 * This is required for nested fields in a custom field (ToggleExpressionField).
 * If we use a custom field the name should be joined with the parent name.
 * https://uniforms.tools/docs/api-helpers/#joinname
 */
const concatenateName = (
  name: string,
  context: Context<Record<string, any>>,
) => {
  if (context.name.length) {
    return joinName(context.name, name)
  }

  return name
}

/*
 * In custom fields with subfields the name is passed down as an empty string
 * because the connectField removes the name from the props. So we need to
 * concatenate the name with the parent name.
 * https://uniforms.tools/docs/api-helpers/#joinname
 */
const getTypeAndValueFieldNames = (name: string) => {
  const typeFieldName = name ? `${name}.type` : 'type'
  const valueFieldName = name ? `${name}.value` : 'value'

  return { typeFieldName, valueFieldName }
}

export const SelectUnionTypeValue = (props: SelectUnionTypeValueProps) => {
  const { name } = props
  const [fieldProps, context] = useField(name, props)
  const oneOf = fieldProps.field.oneOf
  const { typeFieldName, valueFieldName } = getTypeAndValueFieldNames(name)

  if (!oneOf?.length) {
    throw new Error('SelectUnionTypeValue must be used with a oneOf field')
  }

  const { type: selectedTypeId } = fieldProps.value
  const selectOptions = makeSelectOptions(oneOf)

  const valueSchema = {
    label: '',
    properties: {
      value: getTypeFromOneOf(oneOf, selectedTypeId).properties.value,
    },
    required: ['value'],
    type: 'object',
  }

  const previousSelectedTypeId = usePrevious(selectedTypeId)
  useEffect(() => {
    if (
      !isNil(previousSelectedTypeId) &&
      previousSelectedTypeId !== selectedTypeId
    ) {
      context.onChange(concatenateName(name, context), {
        kind: getTypeFromOneOf(oneOf, selectedTypeId).properties.kind.default,
        type: selectedTypeId,
        value: undefined,
      })
    }
  }, [
    context,
    context.onChange,
    previousSelectedTypeId,
    selectedTypeId,
    valueFieldName,
    name,
    oneOf,
  ])

  // This is required to avoid using the value of previously
  // selected type when switching between types.
  const model = {
    value:
      isNil(previousSelectedTypeId) || selectedTypeId === previousSelectedTypeId
        ? fieldProps.value.value
        : undefined,
  }

  return (
    <AntdForm.Item label={fieldProps.label}>
      <div className="[&_label]:text-sm">
        <SelectField
          name={typeFieldName}
          options={selectOptions}
          style={{ minWidth: '5rem' }}
        />

        <Form
          key={selectedTypeId}
          model={model}
          onChangeModel={(formData) => {
            // This automatically sets the default values into the formData for the properties that has a default value
            // This is needed for ReactNodeType or similar types where the schema has a default `type` field value
            // https://ajv.js.org/guide/modifying-data.html#assigning-defaults
            const validate = createValidator(valueSchema)
            validate(formData)

            context.onChange(
              concatenateName(valueFieldName, context),
              formData.value,
            )
          }}
          onSubmit={() => Promise.resolve()}
          schema={valueSchema as any}
        >
          <AutoField name="value" />
        </Form>
      </div>
    </AntdForm.Item>
  )
}

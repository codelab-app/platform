/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TypedProp } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  createValidator,
  Form,
} from '@codelab/frontend-presentation-components-form'
import type { JSONSchemaType } from 'ajv'
import { Form as AntdForm } from 'antd'
import React from 'react'
import type { HTMLFieldProps } from 'uniforms'
import { joinName, useField } from 'uniforms'
import type { SelectFieldProps } from 'uniforms-antd'
import { AutoField, SelectField } from 'uniforms-antd'

export type SelectUnionTypeValueProps = HTMLFieldProps<
  TypedProp,
  SelectFieldProps
>

export const SelectUnionTypeValue = (props: SelectUnionTypeValueProps) => {
  const { name } = props

  const [fieldProps, context] = useField<SelectUnionTypeValueProps, TypedProp>(
    name,
    props,
  )

  const { type, value } = fieldProps.value ?? {}
  const schemas = fieldProps.field.oneOf as Array<JSONSchemaType<any>>

  if (!schemas.length) {
    return null
  }

  const typeOptions = schemas.map((schema) => ({
    label: schema.typeName as string,
    value: schema.properties.type.default as string,
  }))

  // this is needed only for typed props
  const typeToKind: Record<string, string> = schemas.reduce(
    (all, current) => ({
      ...all,
      [current.properties.type.default]: current.properties.kind.default,
    }),
    {},
  )

  const typeFieldName = joinName(name, 'type')
  const valueFieldName = joinName(name, 'value')

  // if no type is selected get the first schema by default
  const currentSchema = type
    ? schemas.find((schema) => schema.properties.type.default === type)
    : schemas[0]

  const valueSchema = {
    label: '',
    properties: {
      value: currentSchema?.properties.value,
    },
    required: [],
    type: 'object',
  }

  return (
    <AntdForm.Item label={fieldProps.label}>
      <div className="[&_label]:text-sm">
        <SelectField
          label=""
          name={typeFieldName}
          onChange={(newType) => {
            context.onChange(name, {
              kind: typeToKind[newType],
              type: newType,
              value: undefined,
            })
          }}
          options={typeOptions}
          style={{ minWidth: '5rem' }}
        />

        <div key={type}>
          <Form
            model={{ value }}
            onChangeModel={(formData) => {
              // This automatically sets the default values into the formData for the properties that has a default value
              // This is needed for ReactNodeType or similar types where the schema has a default `type` field value
              // https://ajv.js.org/guide/modifying-data.html#assigning-defaults
              if (formData.value) {
                const validate = createValidator(valueSchema)

                validate(formData)
                context.onChange(valueFieldName, formData.value)
              }
            }}
            onSubmit={() => Promise.resolve()}
            schema={valueSchema as any}
            uiKey={MODEL_ACTION.SelectUnionTypeValueField.key}
          >
            <AutoField data-testid={valueFieldName} name="value" />
          </Form>
        </div>
      </div>
    </AntdForm.Item>
  )
}

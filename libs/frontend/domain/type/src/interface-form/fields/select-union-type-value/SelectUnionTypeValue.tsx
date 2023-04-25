/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IFieldDefaultValue } from '@codelab/frontend/abstract/core'
import { createValidator, Form } from '@codelab/frontend/presentation/view'
import { usePrevious } from '@codelab/frontend/shared/utils'
import { css } from '@emotion/react'
import { Form as AntdForm } from 'antd'
import isNil from 'lodash/isNil'
import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { useField } from 'uniforms'
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

const unionCss = css`
  label {
    ${tw`text-sm`}
  }
`

export const SelectUnionTypeValue = (props: SelectUnionTypeValueProps) => {
  const { name } = props
  const [fieldProps, context] = useField(name, props)
  const oneOf = fieldProps.field.oneOf
  const typeFieldName = `${name}.type`
  const valueFieldName = `${name}.value`

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
    type: 'object',
  }

  const previousSelectedTypeId = usePrevious(selectedTypeId)
  useEffect(() => {
    if (
      !isNil(previousSelectedTypeId) &&
      previousSelectedTypeId !== selectedTypeId
    ) {
      context.onChange(valueFieldName, undefined)
    }
  }, [
    context,
    context.onChange,
    previousSelectedTypeId,
    selectedTypeId,
    valueFieldName,
  ])

  return (
    <AntdForm.Item label={fieldProps.label}>
      <div css={unionCss}>
        <SelectField
          name={typeFieldName}
          options={selectOptions}
          style={{ minWidth: '5rem' }}
        />

        <Form
          key={selectedTypeId}
          model={{ value: fieldProps.value.value }}
          onChangeModel={(formData) => {
            // This automatically sets the default values into the formData for the properties that has a default value
            // This is needed for ReactNodeType or similar types where the schema has a default `type` field value
            // https://ajv.js.org/guide/modifying-data.html#assigning-defaults
            const validate = createValidator(valueSchema)
            validate(formData)

            context.onChange(valueFieldName, formData.value)
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePrevious } from '@codelab/frontend/shared/utils'
import { Form } from '@codelab/frontend/view/components'
import { css } from '@emotion/react'
import { Form as AntdForm } from 'antd'
import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { useField } from 'uniforms'
import { AutoField, SelectField } from 'uniforms-antd'

export interface SelectUnionTypeValueProps {
  name: string
  value: any
}

const makeSelectOptions = (oneOf: Array<any>) => {
  if (!oneOf?.length) {
    return []
  }

  return oneOf.map((of) => ({
    label: of.typeName,
    value: of.properties.type.default,
  }))
}

const getTypeFromOneOf = (oneOf: Array<any>, typeId: string) => {
  if (!oneOf) {
    return undefined
  }

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

  const { type: selectedTypeId } = (fieldProps.value as any) ?? {}
  const selectOptions = makeSelectOptions(oneOf)

  const valueSchema = {
    type: 'object',
    label: '',
    properties: {
      value: getTypeFromOneOf(oneOf, selectedTypeId).properties.value,
    },
  }

  const previousSelectedTypeId = usePrevious(selectedTypeId)
  useEffect(() => {
    if (previousSelectedTypeId !== selectedTypeId) {
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
          onChangeModel={(formData: any) => {
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

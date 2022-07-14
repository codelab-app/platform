import { IField, IPropsFieldContext } from '@codelab/shared/abstract/core'
import { Input, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import tw from 'twin.macro'

export interface SelectActionFieldProps {
  field: IField
  form: UseFormReturn
  context?: IPropsFieldContext
}

/**
 * We use 2 separate Controller to provide
 *
 * `[propName].type` & `[propName].value` as seen by `TypeValue`
 */
export const SelectActionField = observer(
  ({ field, form, context }: SelectActionFieldProps) => {
    const options = (context?.actionList ?? []).map((action) => ({
      label: action.name,
      value: action.id,
    }))

    return (
      <>
        <Controller
          control={form.control}
          /**
           * Sets the current nodeType's id
           */
          defaultValue={field.type.current.id}
          name={`${field.key}.type`}
          // eslint-disable-next-line react/jsx-no-useless-fragment
          render={(control) => (
            <Input
              disabled
              onBlur={control.field.onBlur}
              onChange={control.field.onChange}
              placeholder="NodeType"
              value={control.field.value}
            />
          )}
        />
        <Controller
          control={form.control}
          /**
           * Sets the reference to a actionId
           */
          name={`${field.key}.value`}
          render={(control) => {
            console.log(control.field.value)

            return (
              <Select
                allowClear
                css={tw`w-full`}
                onBlur={control.field.onBlur}
                onChange={control.field.onChange}
                optionFilterProp="label"
                options={options}
                showSearch
                value={control.field.value}
              />
            )
          }}
        />
      </>
    )
  },
)

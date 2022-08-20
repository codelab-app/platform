import { IEnumType, IField } from '@codelab/shared/abstract/core'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import tw from 'twin.macro'

export interface SelectEnumFieldProps {
  field: IField
  form: UseFormReturn
}

/**
 */
export const SelectEnumField = observer(
  ({ field, form }: SelectEnumFieldProps) => {
    return (
      <Controller
        control={form.control}
        name={field.key}
        render={(control) => (
          <Select
            allowClear
            css={tw`w-full`}
            onBlur={control.field.onBlur}
            onChange={control.field.onChange}
            optionFilterProp="label"
            options={(field.type.current as IEnumType).allowedValues}
            showSearch
            value={control.field.value}
          />
        )}
      />
    )
  },
)

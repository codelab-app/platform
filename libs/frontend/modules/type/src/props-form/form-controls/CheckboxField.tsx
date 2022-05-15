import { IField } from '@codelab/shared/abstract/core'
import { Checkbox } from 'antd'
import { Controller, UseFormReturn } from 'react-hook-form'

interface CheckboxFieldProps {
  field: IField
  form: UseFormReturn
}

export const CheckboxField = ({ field, form }: CheckboxFieldProps) => (
  <Controller
    control={form.control}
    name={field.key}
    render={(control) => (
      <Checkbox
        checked={control.field.value}
        name={control.field.name}
        onChange={control.field.onChange}
      />
    )}
  />
)

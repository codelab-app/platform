import type { SelectOption } from '@codelab/frontend/abstract/types'
import React from 'react'
import {
  type FieldPath,
  type FieldValues,
  useForm,
  type UseFormRegister,
} from 'react-hook-form'

export const Select = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  options,
  register,
}: {
  name: TFieldName
  register: UseFormRegister<TFieldValues>
  options: Array<SelectOption>
}) => {
  return (
    <select {...register(name)}>
      {options.map(({ label, value }) => (
        <option key={label} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}

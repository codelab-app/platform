import { assertIsDefined } from '@codelab/shared/utils'
import React from 'react'
import type { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form'

export const CuiInput = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  register,
}: {
  name: TFieldName
  /**
   * This is injected by the CuiForm
   */
  register?: UseFormRegister<TFieldValues>
}) => {
  assertIsDefined(register)

  return <input {...register(name)} />
}

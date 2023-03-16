import { useAsync, useMountEffect } from '@react-hookz/web'
import React from 'react'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'
import type { SelectAtomProps } from '../types'

export const SelectAtomTypeHook = ({ error, name }: SelectAtomProps) => {
  const [{ error: queryError, result, status }, getAtoms] = useAsync(() =>
    interfaceFormApi.InterfaceForm_GetAtoms({
      where: { name_CONTAINS: 'Hook' },
    }),
  )

  useMountEffect(getAtoms.execute)

  const componentOptions =
    result?.atoms.map((atom) => ({
      label: atom.name,
      value: atom.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      loading={status === 'loading'}
      name={name}
      optionFilterProp="label"
      options={componentOptions}
      showSearch
    />
  )
}

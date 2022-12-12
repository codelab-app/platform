import React from 'react'
import { useAsync } from 'react-use'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'
import { SelectAtomProps } from '../types'

export const SelectAtomTypeHook = ({ name, error }: SelectAtomProps) => {
  const {
    value,
    loading,
    error: queryError,
  } = useAsync(
    () =>
      interfaceFormApi.InterfaceForm_GetAtoms({
        where: { name_CONTAINS: 'Hook' },
      }),
    [],
  )

  const componentOptions =
    value?.atoms.map((atom) => ({
      label: atom.name,
      value: atom.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      loading={loading}
      name={name}
      optionFilterProp="label"
      options={componentOptions}
      showSearch
    />
  )
}

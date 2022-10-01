import React from 'react'
import { useQuery } from 'react-query'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'
import { SelectAtomProps } from '../types'

export const SelectAtomTypeHook = ({ name, error }: SelectAtomProps) => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery('interface-form/select-atom-hook', () =>
    interfaceFormApi.InterfaceForm_GetAtoms({
      where: { name_CONTAINS: 'Hook' },
    }),
  )

  const componentOptions =
    data?.atoms?.map((atom) => ({
      label: atom.name,
      value: atom.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={componentOptions}
      showSearch
    />
  )
}

import React from 'react'
import { SelectField } from 'uniforms-antd'
import { useGetAtomsTypeHookForSelectQuery } from '../../../store'
import { SelectAtomProps } from '../types'

export const SelectAtomTypeHook = ({ name }: SelectAtomProps) => {
  const { data: atoms, isLoading } = useGetAtomsTypeHookForSelectQuery()

  const componentOptions =
    atoms?.getAtomsTypeHook?.map((atom) => ({
      label: atom.name,
      value: atom.id,
    })) ?? []

  return (
    <SelectField
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={componentOptions}
      showSearch={true}
    />
  )
}

import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { useGetAtomsForSelectQuery } from './GetAtomsForSelect.api.graphql.gen'

export type SelectAtomProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectAtom = ({ name }: SelectAtomProps) => {
  const { data: atoms, loading } = useGetAtomsForSelectQuery()

  const componentOptions =
    atoms?.getAtoms?.map((atom) => ({
      label: atom.name,
      value: atom.id,
    })) ?? []

  return (
    <SelectField
      options={componentOptions}
      name={name}
      loading={loading}
      showSearch={true}
      optionFilterProp="label"
    />
  )
}

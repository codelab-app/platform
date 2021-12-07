import { filterNotHookType } from '@codelab/shared/abstract/core'
import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { useGetAtomsForSelectQuery } from '../../../store/typeEndpoints'

export type SelectAtomProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectAtom = ({ name }: SelectAtomProps) => {
  const { data: atoms, isLoading } = useGetAtomsForSelectQuery()

  const componentOptions =
    atoms?.getAtoms
      ?.filter((x) => filterNotHookType(x.type))
      .map((atom) => ({
        label: atom.name,
        value: atom.id,
      })) ?? []

  return (
    <SelectField
      options={componentOptions}
      name={name}
      loading={isLoading}
      showSearch={true}
      optionFilterProp="label"
    />
  )
}

import { useGetAtomsQuery } from '@codelab/frontend/modules/atom'
import { filterNotHookType } from '@codelab/shared/abstract/core'
import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'

export type SelectAtomProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectAtom = ({ name }: SelectAtomProps) => {
  const { data: atoms, isLoading } = useGetAtomsQuery()

  const componentOptions =
    atoms?.atoms
      ?.filter((x) => filterNotHookType(x.type))
      .map((atom) => ({
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

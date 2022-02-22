import { useGetAtomsQuery } from '@codelab/frontend/modules/atom'
import React from 'react'
import { SelectField } from 'uniforms-antd'
import { SelectAtomProps } from '../types'

export const SelectAtomTypeHook = ({ name }: SelectAtomProps) => {
  const { data: atoms, isLoading } = useGetAtomsQuery({
    variables: { where: { name_CONTAINS: 'Hook' } },
  })

  const componentOptions =
    atoms?.atoms?.map((atom) => ({
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

import { filterNotHookType } from '@codelab/shared/abstract/core'
import React from 'react'
import { useQuery } from 'react-query'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectAtomProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectAtom = ({ name, error }: SelectAtomProps) => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery('interface-form/select-atom', () =>
    interfaceFormApi.InterfaceForm_GetAtoms({
      where: { name_NOT_CONTAINS: 'Hook' },
    }),
  )

  const componentOptions =
    data?.atoms
      ?.filter((x) => filterNotHookType(x.type))
      .map((atom) => ({
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

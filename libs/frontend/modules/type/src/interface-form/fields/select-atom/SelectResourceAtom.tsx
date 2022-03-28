import { filterNotHookType, filterResourceType } from '@codelab/shared/abstract/core'
import React from 'react'
import { useQuery } from 'react-query'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectAtomProps = HTMLFieldProps<string, SelectFieldProps>

const useResourceAtom = () => {
  const data = useQuery('resource-atom', () =>
    interfaceFormApi.InterfaceForm_GetAtomsWithApi({
      where: { name_CONTAINS: 'Resource' },
    }),
  )

  return data
}

export const SelectResourceAtom = ({ name, error }: SelectAtomProps) => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useResourceAtom()

  const componentOptions =
    data?.atoms
      ?.filter((x) => filterResourceType(x.type))
      .map((atom) => ({
        label: atom.name,
        value: atom.type,
      })) ?? []

  return (
    <SelectField
      error={error || queryError}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={componentOptions}
      showSearch={true}
    />
  )
}

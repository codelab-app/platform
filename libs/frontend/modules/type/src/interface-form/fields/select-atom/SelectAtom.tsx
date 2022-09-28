import { filterNotHookType, IAtom } from '@codelab/shared/abstract/core'
import { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { useQuery } from 'react-query'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectAtomProps = Pick<
  UniformSelectFieldProps,
  'label' | 'name' | 'error'
> & {
  /**
   * Used for atom validation
   */
  parent?: IAtom
}

/**
 * @returns { data, isLoading, error }
 */
export const useGetAllAtoms = () => {
  const { data, isLoading, error } = useQuery(
    'interface-form/select-atom',
    () =>
      interfaceFormApi.InterfaceForm_GetAtoms({
        where: { name_NOT_CONTAINS: 'Hook' },
      }),
  )

  const atomOptions =
    data?.atoms
      ?.filter((x) => filterNotHookType(x.type))
      .map((atom) => ({
        label: atom.name,
        value: atom.id,
      })) ?? []

  return {
    data,
    atomOptions,
    isLoading,
    error,
  }
}

export const SelectAtom = ({ label, name, error, parent }: SelectAtomProps) => {
  const { atomOptions, isLoading, error: queryError } = useGetAllAtoms()

  console.log(parent)

  const filteredOptions = atomOptions.filter((atom) => {
    return true
  })

  return (
    <SelectField
      error={error || queryError}
      label={label}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={filteredOptions}
      showSearch
    />
  )
}

import { filterNotHookType, IElement } from '@codelab/shared/abstract/core'
import React from 'react'
import { useQuery } from 'react-query'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectAtomProps = HTMLFieldProps<string, SelectFieldProps> & {
  /**
   * Used for atom validation
   */
  parent: IElement
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

export const SelectAtom = ({ name, error, parent }: SelectAtomProps) => {
  const { atomOptions, isLoading, error: queryError } = useGetAllAtoms()

  return (
    <SelectField
      error={error || queryError}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={atomOptions}
      showSearch
    />
  )
}

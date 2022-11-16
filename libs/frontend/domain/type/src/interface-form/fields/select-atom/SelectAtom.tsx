import { filterNotHookType, IAtom } from '@codelab/frontend/abstract/core'
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
      .filter((x) => filterNotHookType(x.type))
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
  const allowedChildrenIds = parent?.allowedChildren.map((child) => child.id)
  const { atomOptions, isLoading, error: queryError } = useGetAllAtoms()

  /**
   * Sort for now before data is added
   */
  const filteredOptions = atomOptions.sort((a, b) => {
    if (allowedChildrenIds?.includes(a.value)) {
      return -1
    }

    return 1
  })

  // const filteredOptions = atomOptions.filter((atom) => {
  //   return allowedChildrenIds?.includes(atom.value)
  // })

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={filteredOptions}
      showSearch
    />
  )
}

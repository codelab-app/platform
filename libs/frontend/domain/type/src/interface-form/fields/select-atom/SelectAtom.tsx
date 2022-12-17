import type { IAtom } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { useAsync } from 'react-use'
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
  const { value, loading, error } = useAsync(
    () =>
      interfaceFormApi.InterfaceForm_GetAtoms({
        where: { name_NOT_CONTAINS: 'Hook' },
      }),
    [],
  )

  const atomOptions =
    value?.atoms
      .filter((x) => filterNotHookType(x.type))
      .map((atom) => ({ label: atom.name, value: atom.id })) ?? []

  return { atomOptions, loading, error }
}

export const SelectAtom = ({ label, name, error, parent }: SelectAtomProps) => {
  const allowedChildrenIds = parent?.allowedChildren.map((child) => child.id)
  const { atomOptions, loading, error: queryError } = useGetAllAtoms()

  /**
   * Sort for now before data is added
   */
  const filteredOptions = atomOptions.sort((a, b) => {
    if (allowedChildrenIds?.includes(a.value)) {
      return -1
    }

    return 1
  })

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={loading}
      name={name}
      optionFilterProp="label"
      options={filteredOptions}
      showSearch
    />
  )
}

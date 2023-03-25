import type { IAtom } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync, useMountEffect } from '@react-hookz/web'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectAtomProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name'
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
  const { atomService } = useStore()

  const [{ error, result, status }, getAtoms] = useAsync(async () => {
    return atomService.allAtomsLoaded
      ? atomService.atomsList
      : await atomService.getAll()
  })

  const atomOptions =
    result
      ?.filter(({ type }) => filterNotHookType(type))
      .map((atom) => ({ label: atom.name, value: atom.id })) ?? []

  return { atomOptions, error, getAtoms, loading: status === 'loading' }
}

export const SelectAtom = ({ error, label, name, parent }: SelectAtomProps) => {
  const suggestedChildrenIds = parent?.suggestedChildren.map(
    (child) => child.id,
  )

  const { atomOptions, error: queryError, getAtoms, loading } = useGetAllAtoms()

  /**
   * Sort for now before data is added
   */
  const filteredOptions = atomOptions.sort(({ value }) =>
    suggestedChildrenIds?.includes(value) ? -1 : 1,
  )

  useMountEffect(getAtoms.execute)

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

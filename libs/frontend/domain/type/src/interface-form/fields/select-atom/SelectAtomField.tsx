import type { IAtom } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import React, { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import type { FieldProps } from 'uniforms'
import { connectField } from 'uniforms'
import type { SelectFieldProps } from 'uniforms-antd'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectAtomProps = FieldProps<
  SelectFieldProps,
  {
    /**
     * Used for atom validation
     */
    parent?: IAtom
  }
>

/**
 * @returns { data, isLoading, error }
 */
export const useGetAllAtoms = () => {
  const [{ value, loading, error }, getAllAtoms] = useAsyncFn(
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

  return { atomOptions, loading, error, getAllAtoms }
}

const SelectAtom = ({ label, name, error, parent }: SelectAtomProps) => {
  const allowedChildrenIds = parent?.allowedChildren.map((child) => child.id)

  const {
    atomOptions,
    loading,
    error: queryError,
    getAllAtoms,
  } = useGetAllAtoms()

  useEffect(() => {
    void getAllAtoms()
  }, [getAllAtoms])

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

export const SelectAtomField = connectField(SelectAtom, {
  kind: 'leaf',
})

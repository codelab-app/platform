import type { IAtom } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { useAsync } from 'react-use'
import { useForm } from 'uniforms'
import { SelectField } from 'uniforms-antd'

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
  const { atomService } = useStore()

  const { value, loading, error } = useAsync(async () => {
    return atomService.allAtomsLoaded
      ? atomService.atomsList
      : await atomService.getAll()
  }, [])

  const atomOptions =
    value
      ?.filter(({ type }) => filterNotHookType(type))
      .map((atom) => ({ label: atom.name, value: atom.id })) ?? []

  return { atomOptions, loading, error }
}

export const SelectAtom = ({ label, name, error, parent }: SelectAtomProps) => {
  const { atomService } = useStore()
  const context = useForm()

  const suggestedChildrenIds = parent?.suggestedChildren.map(
    (child) => child.id,
  )

  const { atomOptions, loading, error: queryError } = useGetAllAtoms()

  /**
   * Sort for now before data is added
   */
  const filteredOptions = atomOptions.sort(({ value }) =>
    suggestedChildrenIds?.includes(value) ? -1 : 1,
  )

  const validateRequiredParent = (selectedAtomId: string) => {
    const currentFormState = context.formRef.state

    const selectedAtom = atomService.atomsList.find(
      (atom) => atom.id === selectedAtomId,
    )

    if (!selectedAtom?.requiredParents.length) {
      return
    }

    const requiredParentsNames = selectedAtom.requiredParents
      .map((item) => item.name)
      .join(', ')

    const notifyError = () => {
      const errorMessage = `${selectedAtom.name} requires [${requiredParentsNames}] as parent.`
      createNotificationHandler({ title: errorMessage })()
      context.formRef.reset()
      context.formRef.setState(currentFormState)
    }

    if (!parent) {
      notifyError()

      return
    }

    const isValidParent = selectedAtom.requiredParents.find(
      (item) => item.id === parent.id,
    )

    if (!isValidParent) {
      notifyError()
    }
  }

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={loading}
      name={name}
      onSelect={validateRequiredParent}
      optionFilterProp="label"
      options={filteredOptions}
      showSearch
    />
  )
}

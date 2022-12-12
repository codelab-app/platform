import { useStore } from '@codelab/frontend/presenter/container'
import { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { useAsync } from 'react-use'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectComponentProps = Pick<
  UniformSelectFieldProps,
  'name' | 'label' | 'error'
>

export const SelectComponent = ({
  name,
  label,
  error,
}: SelectComponentProps) => {
  const { builderService } = useStore()

  const {
    value,
    loading,
    error: queryError,
  } = useAsync(() => interfaceFormApi.InterfaceForm_GetComponents(), [])

  // remove the components that refer the current component to avoid creating circular references
  // including itself
  const filteredComponents = value?.components.filter(
    (component) =>
      component.descendantComponentIds.indexOf(
        builderService.activeComponent?.id ?? '',
      ) === -1,
  )

  const componentOptions =
    filteredComponents?.map((component) => ({
      label: component.name,
      value: component.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={loading}
      name={name}
      optionFilterProp="label"
      options={componentOptions}
      showSearch
    />
  )
}

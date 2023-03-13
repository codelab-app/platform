/* eslint-disable react/jsx-props-no-spreading */
import { useStore } from '@codelab/frontend/presenter/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { useAsync } from 'react-use'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectComponentProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name'
>

export const SelectComponent = (fieldProps: SelectComponentProps) => {
  const { builderService } = useStore()

  const {
    error: queryError,
    loading,
    value,
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
      {...fieldProps}
      error={fieldProps.error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={loading}
      optionFilterProp="label"
      options={componentOptions}
      showSearch
    />
  )
}

/* eslint-disable react/jsx-props-no-spreading */
import { useStore } from '@codelab/frontend/presenter/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import sortBy from 'lodash/sortBy'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectComponentProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name'
>

export const SelectComponent = ({ ...fieldProps }: SelectComponentProps) => {
  const { builderService, componentService } = useStore()
  const allComponents = sortBy(componentService.componentList, 'name')
  // Used for filtering the component options
  const parentComponent = builderService.activeComponent?.current

  // remove the components that refer the current component to avoid creating circular references
  // including itself
  const filteredComponents = allComponents.filter((component) => {
    if (component.id === parentComponent?.id) {
      return false
    }

    const descendants = component.descendantComponents

    return (
      !parentComponent?.id ||
      !descendants.some(({ id }) => id === parentComponent.id)
    )
  })

  const componentOptions = filteredComponents.map((component) => ({
    label: component.name,
    value: component.id,
  }))

  return (
    <SelectField
      {...fieldProps}
      error={fieldProps.error}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      optionFilterProp="label"
      options={componentOptions}
      showSearch
    />
  )
}

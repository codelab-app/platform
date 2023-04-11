/* eslint-disable react/jsx-props-no-spreading */
import type { IComponent } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import sortBy from 'lodash/sortBy'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectComponentProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name'
> & {
  // Used for filtering the component options
  parent?: IComponent
}

export const SelectComponent = ({
  parent,
  ...fieldProps
}: SelectComponentProps) => {
  const { componentService } = useStore()
  const allComponents = sortBy(componentService.componentList, 'name')

  // remove the components that refer the current component to avoid creating circular references
  // including itself
  const filteredComponents = allComponents.filter((component) => {
    if (component.id === parent?.id) {
      return false
    }

    const descendants = component.rootElement.current.descendantElements

    return (
      !parent?.id ||
      !descendants.some(
        ({ renderType }) => renderType?.maybeCurrent?.id === parent.id,
      )
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

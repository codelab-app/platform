/* eslint-disable react/jsx-props-no-spreading */
import type { IComponent } from '@codelab/frontend/abstract/core'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync, useMountEffect } from '@react-hookz/web'
import sortBy from 'lodash/sortBy'
import React from 'react'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

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
  const [{ error: queryError, result, status }, getComponents] = useAsync(() =>
    interfaceFormApi.InterfaceForm_GetComponents(),
  )

  // remove the components that refer the current component to avoid creating circular references
  // including itself
  // would be nice if this can be sorted on the backend
  const filteredComponents = sortBy(result?.components ?? [], 'name').filter(
    (component) =>
      component.descendantComponentIds.indexOf(parent?.id ?? '') === -1,
  )

  const componentOptions = filteredComponents.map((component) => ({
    label: component.name,
    value: component.id,
  }))

  useMountEffect(getComponents.execute)

  return (
    <SelectField
      {...fieldProps}
      error={fieldProps.error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={status === 'loading'}
      optionFilterProp="label"
      options={componentOptions}
      showSearch
    />
  )
}

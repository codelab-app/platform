/* eslint-disable react/jsx-props-no-spreading */
import { useStore } from '@codelab/frontend/presentation/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectActionProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name' | 'required' | 'value'
> & {
  onChange(value: unknown): void
}

export const SelectAction = (fieldProps: SelectActionProps) => {
  const { actionService, builderService } = useStore()
  const store = builderService.selectedNode?.current.store.current

  const actions = store
    ? actionService.actionsList.filter((action) => action.store.id === store.id)
    : actionService.actionsList

  const options = actions.map((action) => ({
    label: action.name,
    value: action.id,
  }))

  return (
    <SelectField
      {...fieldProps}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      optionFilterProp="label"
      options={options}
      showSearch
    />
  )
}

/* eslint-disable react/jsx-props-no-spreading */
import { useStore } from '@codelab/frontend/application/shared/store'
import type {
  IEntity,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectActionProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name' | 'required' | 'value'
> & {
  onChange(value: unknown): void
  updatedAction?: IEntity
}

export const SelectAction = (fieldProps: SelectActionProps) => {
  const { actionService } = useStore()
  const actions = actionService.getSelectActions(fieldProps.updatedAction)

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

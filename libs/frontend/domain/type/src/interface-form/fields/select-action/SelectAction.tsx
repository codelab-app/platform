/* eslint-disable react/jsx-props-no-spreading */
import { useStore } from '@codelab/frontend/presentation/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectActionProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name'
>

export const SelectAction = (fieldProps: SelectActionProps) => {
  const { actionService } = useStore()

  const actions = actionService.actionsList.map((action) => ({
    label: action.name,
    value: action.id,
  }))

  return (
    <SelectField
      {...fieldProps}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      optionFilterProp="label"
      options={actions}
      showSearch
    />
  )
}

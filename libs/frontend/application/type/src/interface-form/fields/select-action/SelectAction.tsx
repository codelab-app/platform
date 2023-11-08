/* eslint-disable react/jsx-props-no-spreading */
import { useStore } from '@codelab/frontend/application/shared/store'
import type { IRef } from '@codelab/shared/abstract/core'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectActionProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name' | 'required' | 'value'
> & {
  onChange(value: unknown): void
  updatedAction?: IRef
}

export const SelectAction = (fieldProps: SelectActionProps) => {
  const { actionService } = useStore()

  const selectActionOptions =
    actionService.actionDomainService.getSelectActionOptions(
      fieldProps.updatedAction,
    )

  return (
    <SelectField
      {...fieldProps}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      optionFilterProp="label"
      options={selectActionOptions}
      showSearch
    />
  )
}

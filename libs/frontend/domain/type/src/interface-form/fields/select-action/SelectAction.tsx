/* eslint-disable react/jsx-props-no-spreading */
import { useStore } from '@codelab/frontend/presenter/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectActionProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name'
>

export const SelectAction = (fieldProps: SelectActionProps) => {
  const { storeService } = useStore()

  const actions = [...storeService.stores.values()]
    .flatMap((store) => store.actions)
    .map((action) => ({ label: action.current.name, value: action.current.id }))

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

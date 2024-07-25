/* eslint-disable react/jsx-props-no-spreading */
import { useStore } from '@codelab/frontend/infra/mobx'
import type { IRef } from '@codelab/shared/abstract/core'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectActionProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name' | 'required' | 'value'
> & {
  updatedAction?: IRef

  onChange(value: unknown): void
}

export const SelectAction = (fieldProps: SelectActionProps) => {
  const { actionService, builderService } = useStore()
  const selectedNode = builderService.selectedNode?.current
  const runtimeStore = selectedNode?.runtimeStore
  const store = runtimeStore?.store.current

  const providerStore =
    runtimeStore?.runtimeProviderStore?.current.store.current

  const selectActionOptions = store
    ? actionService.actionDomainService.getSelectActionOptions(
        store,
        providerStore,
        fieldProps.updatedAction,
      )
    : []

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

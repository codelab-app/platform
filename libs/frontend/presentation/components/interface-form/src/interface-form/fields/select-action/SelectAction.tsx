/* eslint-disable react/jsx-props-no-spreading */
import type { IRuntimeModel } from '@codelab/frontend/abstract/application'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import type { IRef } from '@codelab/shared/abstract/core'
import type {
  Nullable,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'
import { SelectField } from 'uniforms-antd'

export type SelectActionProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name' | 'required' | 'value'
> & {
  updatedAction?: IRef
  selectedNode?: Nullable<IRuntimeModel>

  onChange(value: unknown): void
}

export const SelectAction = ({
  selectedNode,
  ...fieldProps
}: SelectActionProps) => {
  const { actionDomainService } = useDomainStore()
  const runtimeStore = selectedNode?.runtimeStore
  const store = runtimeStore?.store.current

  const providerStore =
    runtimeStore?.runtimeProviderStore?.current.store.current

  const selectActionOptions = store
    ? actionDomainService.getSelectActionOptions(
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

'use client'

/* eslint-disable react/jsx-props-no-spreading */
import type { IRuntimeModel } from '@codelab/frontend/abstract/application'
import type { IRef } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { GuaranteedProps } from 'uniforms'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useFormContext } from '@codelab/frontend-presentation-components-form'
import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

type SelectActionField = GuaranteedProps<Nullable<Array<IRef>>> & {
  selectedNode?: Nullable<IRuntimeModel>
  updatedAction?: IRef
}
export const SelectActionsField = connectField<SelectActionField>(
  ({ selectedNode, ...fieldProps }) => {
    const formContext = useFormContext()
    const { actionDomainService } = useDomainStore()

    const runtimeStore = (selectedNode ?? formContext.selectedNode)
      ?.runtimeStore

    const store = runtimeStore?.store?.current

    const providerStore =
      runtimeStore?.runtimeProviderStore?.current.store?.current

    const selectActionOptions = store
      ? actionDomainService.getSelectActionOptions(
          store,
          providerStore,
          fieldProps.updatedAction,
        )
      : []

    return (
      <SelectField
        mode="multiple"
        {...fieldProps}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        onChange={(value: Array<string>) => {
          const idFields = value.map((id) => ({ id }))

          fieldProps.onChange(idFields)
        }}
        optionFilterProp="label"
        options={selectActionOptions}
        showSearch
        value={fieldProps.value?.map((ref) => ref.id)}
      />
    )
  },
  { kind: 'leaf' },
)

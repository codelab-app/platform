'use client'

/* eslint-disable react/jsx-props-no-spreading */
import type { IRuntimeModel } from '@codelab/frontend-abstract-application'
import type { IRef } from '@codelab/shared-abstract-core'
import type { Nullable } from '@codelab/shared-abstract-types'
import type { GuaranteedProps } from 'uniforms'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useFormContext } from '@codelab/frontend-presentation-components-form'
import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

export type SelectActionProps = Pick<
  SelectFieldProps,
  'error' | 'label' | 'name' | 'onChange' | 'required' | 'value'
> & {
  updatedAction?: IRef
  selectedNode?: Nullable<IRuntimeModel>
}

export const SelectActionField = connectField(
  ({ selectedNode, ...fieldProps }: SelectActionProps) => {
    const formContext = useFormContext()
    const { actionDomainService } = useDomainStore()

    const runtimeStore = (selectedNode ?? formContext.selectedNode)
      ?.runtimeStore

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
        name="id"
        optionFilterProp="label"
        options={selectActionOptions}
        showSearch
      />
    )
  },
  {
    initialValue: true,
    kind: 'node',
  },
)

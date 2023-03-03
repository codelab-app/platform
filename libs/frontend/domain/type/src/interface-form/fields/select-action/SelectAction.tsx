/* eslint-disable react/jsx-props-no-spreading */
import {
  useCurrentAppId,
  useStore,
} from '@codelab/frontend/presenter/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectActionProps = Pick<
  UniformSelectFieldProps,
  'label' | 'name' | 'error'
>

export const SelectAction = (fieldProps: SelectActionProps) => {
  const { storeService, appService } = useStore()
  const appId = useCurrentAppId()
  const app = appService.app(appId)
  const appStore = app && storeService.store(app.store.id)
  const storeActions = appStore?.actions

  const actionOptions = (storeActions ?? []).map((action) => ({
    label: action.current.name,
    value: action.id,
  }))

  return (
    <SelectField
      {...fieldProps}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      optionFilterProp="label"
      options={actionOptions}
      showSearch
    />
  )
}

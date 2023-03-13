import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { useAsync } from 'react-use'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export const SelectApp = ({ error, name }: UniformSelectFieldProps) => {
  const {
    error: queryError,
    loading,
    value,
  } = useAsync(() => interfaceFormApi.InterfaceForm_GetApps(), [])

  const appOptions =
    value?.apps.map((app) => ({
      label: app.name,
      value: app.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={loading}
      name={name}
      optionFilterProp="label"
      options={appOptions}
      showSearch
    />
  )
}

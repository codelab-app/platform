import { interfaceFormApi } from '@codelab/frontend/domain/type'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync, useMountEffect } from '@react-hookz/web'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export const SelectApp = ({ error, name }: UniformSelectFieldProps) => {
  const [{ error: queryError, result, status }, getApps] = useAsync(() =>
    interfaceFormApi.InterfaceForm_GetApps(),
  )

  useMountEffect(getApps.execute)

  const appOptions =
    result?.apps.map((app) => ({
      label: app.name,
      value: app.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={status === 'loading'}
      name={name}
      optionFilterProp="label"
      options={appOptions}
      showSearch
    />
  )
}

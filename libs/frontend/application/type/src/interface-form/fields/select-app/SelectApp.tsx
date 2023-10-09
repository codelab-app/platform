import { useStore } from '@codelab/frontend/application/shared/store'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync, useMountEffect } from '@react-hookz/web'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export const SelectApp = ({ error, name }: UniformSelectFieldProps) => {
  const { appService } = useStore()

  const [{ error: queryError, result: apps = [], status }, getApps] = useAsync(
    () => appService.getAll(),
  )

  useMountEffect(getApps.execute)

  const appOptions = apps.map((app) => ({
    label: app.name,
    value: app.id,
  }))

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

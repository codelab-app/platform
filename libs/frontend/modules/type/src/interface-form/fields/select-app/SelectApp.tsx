import { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { useQuery } from 'react-query'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export const SelectApp = ({ name, error }: UniformSelectFieldProps) => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery('interface-form/select-app', () =>
    interfaceFormApi.InterfaceForm_GetApps(),
  )

  const appOptions =
    data?.apps.map((app) => ({
      label: app.name,
      value: app.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={appOptions}
      showSearch
    />
  )
}

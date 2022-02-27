import { useGetAppsQuery } from '@codelab/frontend/modules/app'
import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'

export type SelectAppProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectApp = ({ name }: SelectAppProps) => {
  const { data, isLoading } = useGetAppsQuery()

  const appOptions =
    data?.apps.map((app) => ({
      label: app.name,
      value: app.id,
    })) ?? []

  return (
    <SelectField
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={appOptions}
      showSearch={true}
    />
  )
}

import { useGetAppsQuery } from '@codelab/frontend/modules/app'
import { useRouter } from 'next/router'
import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'

export type SelectAppProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectApp = ({ name }: SelectAppProps) => {
  const router = useRouter()
  const { data, isLoading } = useGetAppsQuery({})

  const appOptions =
    data?.apps.map((app) => ({
      label: app.name,
      value: app.id,
    })) ?? []

  return (
    <SelectField
      options={appOptions}
      name={name}
      loading={isLoading}
      showSearch={true}
      optionFilterProp="label"
    />
  )
}

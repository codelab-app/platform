import { useRouter } from 'next/router'
import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { useGetPagesForSelectQuery } from './GetPagesForSelect.api.graphql.gen'

export type SelectPageProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectPage = ({ name }: SelectPageProps) => {
  const router = useRouter()

  const { data, loading } = useGetPagesForSelectQuery({
    variables: { input: { byApp: { appId: String(router.query.appId) } } },
  })

  const pageOptions =
    data?.pages.map((page) => ({
      label: page.name,
      value: page.id,
    })) ?? []

  return (
    <SelectField
      label="Page"
      options={pageOptions}
      name={name}
      loading={loading}
      showSearch={true}
      optionFilterProp="label"
    />
  )
}

import { useGetPagesQuery } from '@codelab/codegen/graphql'
import { AppContext } from '@codelab/frontend/shared'
import React, { useContext } from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'

export type SelectPageProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectPage = ({ name }: SelectPageProps) => {
  const { app } = useContext(AppContext)

  const { data: pages, loading } = useGetPagesQuery({
    variables: {
      input: { byApp: { appId: app.id } },
    },
  })

  const pageOptions =
    pages?.pages.map((page) => ({
      label: page.name,
      value: page.id,
    })) ?? []

  return (
    <SelectField
      options={pageOptions}
      name={name}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      loading={loading}
    />
  )
}

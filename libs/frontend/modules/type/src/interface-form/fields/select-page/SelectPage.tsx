import { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectPageProps = UniformSelectFieldProps

export const SelectPage = ({ name, error }: SelectPageProps) => {
  const router = useRouter()
  const appId = router.query.appId

  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery('interface-form/select-page', () =>
    interfaceFormApi.InterfaceForm_GetPages({
      where: { app: { id: appId as string } },
    }),
  )

  if (!appId) {
    console.warn('SelectPage: appId is not defined')

    return null
  }

  const pageOptions =
    data?.pages.map((page) => ({
      label: page.name,
      value: page.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      label="Page"
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={pageOptions}
      showSearch
    />
  )
}

import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useRouter } from 'next/router'
import React from 'react'
import { useAsync } from 'react-use'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectPageProps = UniformSelectFieldProps

export const SelectPage = ({ name, error }: SelectPageProps) => {
  const router = useRouter()
  const appId = router.query.appId

  const {
    value,
    loading,
    error: queryError,
  } = useAsync(
    () =>
      interfaceFormApi.InterfaceForm_GetPages({
        where: { app: { id: appId as string } },
      }),
    [],
  )

  if (!appId) {
    console.warn('SelectPage: appId is not defined')

    return null
  }

  const pageOptions =
    value?.pages.map((page) => ({
      label: page.name,
      value: page.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label="Page"
      loading={loading}
      name={name}
      optionFilterProp="label"
      options={pageOptions}
      showSearch
    />
  )
}

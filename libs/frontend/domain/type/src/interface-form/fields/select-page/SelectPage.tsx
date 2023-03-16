import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { useRouter } from 'next/router'
import React from 'react'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectPageProps = UniformSelectFieldProps

export const SelectPage = ({ error, name }: SelectPageProps) => {
  const router = useRouter()
  const appId = router.query.appId

  const [{ error: queryError, result, status }, getPages] = useAsync(() =>
    interfaceFormApi.InterfaceForm_GetPages({
      where: { appConnection: { node: { id: appId as string } } },
    }),
  )

  useMountEffect(getPages.execute)

  if (!appId) {
    console.warn('SelectPage: appId is not defined')

    return null
  }

  const pageOptions =
    result?.pages.map((page) => ({
      label: page.name,
      value: page.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label="Page"
      loading={status === 'loading'}
      name={name}
      optionFilterProp="label"
      options={pageOptions}
      showSearch
    />
  )
}

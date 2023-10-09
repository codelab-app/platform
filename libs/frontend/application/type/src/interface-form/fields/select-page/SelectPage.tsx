import { useStore } from '@codelab/frontend/application/shared/store'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync, useMountEffect } from '@react-hookz/web'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectPageProps = UniformSelectFieldProps

export const SelectPage = ({ error, name }: SelectPageProps) => {
  const app = useCurrentApp()
  const { pageService } = useStore()

  const [{ error: queryError, result: pages = [], status }, getPages] =
    useAsync(() =>
      pageService.getAll({ appConnection: { node: { id: app?.id } } }),
    )

  useMountEffect(getPages.execute)

  if (!app?.id) {
    console.warn('SelectPage: appId is not defined')

    return null
  }

  const pageOptions = pages.map((page) => ({
    label: page.name,
    value: page.id,
  }))

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

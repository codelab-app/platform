import { useStore } from '@codelab/frontend/infra/mobx'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectPageProps = UniformSelectFieldProps

export const SelectPage = ({ error, label, name }: SelectPageProps) => {
  const app = useCurrentApp()
  const { pageService } = useStore()

  const [
    { error: queryError, result: selectPageOptions = [], status },
    getSelectPageOptions,
  ] = useAsync(() => pageService.getSelectPageOptions(app.id))

  if (!app.id) {
    console.warn('SelectPage: appId is not defined')

    return null
  }

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={status === 'loading'}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && status === 'not-executed') {
          await getSelectPageOptions.execute()
        }
      }}
      optionFilterProp="label"
      options={selectPageOptions}
      showSearch
    />
  )
}

import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { getSelectPageOptions } from '@codelab/frontend-domain-page/repositories'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectPageProps = UniformSelectFieldProps

export const SelectPage = ({ error, label, name }: SelectPageProps) => {
  const app = useCurrentApp()

  const [
    { error: queryError, result: selectPageOptions = [], status },
    _getSelectPageOptions,
  ] = useAsync(() => getSelectPageOptions(app.id))

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={status === 'loading'}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && status === 'not-executed') {
          await _getSelectPageOptions.execute()
        }
      }}
      optionFilterProp="label"
      options={selectPageOptions}
      showSearch
    />
  )
}

'use client'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'

import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { getSelectPageOptions } from '@codelab/frontend-domain-page/repositories'
import { useAsyncFn } from 'react-use'
import { SelectField } from 'uniforms-antd'

export type SelectPageProps = UniformSelectFieldProps

export const SelectPage = ({ error, label, name }: SelectPageProps) => {
  const app = useCurrentApp()

  const [
    { error: queryError, loading, value: selectPageOptions = [] },
    executeGetSelectPageOptions,
  ] = useAsyncFn(() => getSelectPageOptions(app?.id))

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={loading}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && !selectPageOptions.length) {
          await executeGetSelectPageOptions()
        }
      }}
      optionFilterProp="label"
      options={selectPageOptions}
      showSearch
    />
  )
}

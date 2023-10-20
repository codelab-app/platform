import { useStore } from '@codelab/frontend/application/shared/store'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export const SelectApp = ({ error, name }: UniformSelectFieldProps) => {
  const { appService } = useStore()

  const [
    { error: queryError, result: selectAppOptions = [], status },
    getSelectAppOptions,
  ] = useAsync(() => appService.getSelectAppOptions())

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={status === 'loading'}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && status === 'not-executed') {
          await getSelectAppOptions.execute()
        }
      }}
      optionFilterProp="label"
      options={selectAppOptions}
      showSearch
    />
  )
}

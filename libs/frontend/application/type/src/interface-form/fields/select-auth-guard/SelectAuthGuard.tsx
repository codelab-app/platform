import { useStore } from '@codelab/frontend/application/shared/store'
import { useAsync } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export interface SelectAuthGuardsProps {
  name: string
}

export const SelectAuthGuard = observer<SelectAuthGuardsProps>(({ name }) => {
  const { authGuardService } = useStore()

  const [
    { error: queryError, result: selectAuthGuardOptions, status },
    getSelectAuthGuardOptions,
  ] = useAsync(() => authGuardService.getSelectAuthGuardOptions())

  return (
    <SelectField
      error={queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && status === 'not-executed') {
          await getSelectAuthGuardOptions.execute()
        }
      }}
      optionFilterProp="label"
      options={selectAuthGuardOptions}
      showSearch
    />
  )
})

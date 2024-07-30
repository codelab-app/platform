import { useAuthGuardService } from '@codelab/frontend-application-auth-guard/services'
import { useAsync } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export interface SelectAuthGuardsProps {
  name: string
}

export const SelectAuthGuard = observer<SelectAuthGuardsProps>(({ name }) => {
  const authGuardService = useAuthGuardService()

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

import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { useAsync } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export interface SelectAuthGuardsProps {
  name: string
}

export const SelectAuthGuard = observer<SelectAuthGuardsProps>(({ name }) => {
  const [{ error, result, status }, getSelectAuthGuardOptions] = useAsync(() =>
    authGuardRepository.selectOptions(),
  )

  return (
    <SelectField
      error={error}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && status === 'not-executed') {
          await getSelectAuthGuardOptions.execute()
        }
      }}
      optionFilterProp="label"
      options={result}
      showSearch
    />
  )
})

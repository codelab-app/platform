'use client'

import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { observer } from 'mobx-react-lite'
import { useAsyncFn } from 'react-use'
import { SelectField } from 'uniforms-antd'

export interface SelectAuthGuardsProps {
  name: string
}

export const SelectAuthGuard = observer<SelectAuthGuardsProps>(({ name }) => {
  const [state, getSelectAuthGuardOptions] = useAsyncFn(() =>
    authGuardRepository.selectOptions(),
  )

  return (
    <SelectField
      error={state.error}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && !state.loading && !state.value) {
          await getSelectAuthGuardOptions()
        }
      }}
      optionFilterProp="label"
      options={state.value}
      showSearch
    />
  )
})

import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useAsync } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export interface SelectResourcesProps {
  name: string
}

export const SelectResource = observer<SelectResourcesProps>(({ name }) => {
  const { resourceService } = useStore()

  const [
    { error: queryError, result: selectResourceOptions, status },
    getSelectResourceOptions,
  ] = useAsync(() => resourceService.getSelectResourceOptions())

  return (
    <SelectField
      error={queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && status === 'not-executed') {
          await getSelectResourceOptions.execute()
        }
      }}
      optionFilterProp="label"
      options={selectResourceOptions}
      showSearch
    />
  )
})

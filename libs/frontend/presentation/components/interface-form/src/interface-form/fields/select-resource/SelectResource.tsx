import { useResourceService } from '@codelab/frontend-application-resource/services'
import { useAsync } from '@react-hookz/web'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export interface SelectResourcesProps {
  name: string
}

export const SelectResource = ({ name }: SelectResourcesProps) => {
  const resourceService = useResourceService()

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
}

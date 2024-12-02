'use client'

import { useResourceService } from '@codelab/frontend-application-resource/services'
import { useAsyncFn } from 'react-use'
import { SelectField } from 'uniforms-antd'

export interface SelectResourcesProps {
  name: string
}

export const SelectResource = ({ name }: SelectResourcesProps) => {
  const resourceService = useResourceService()

  const [
    { error: queryError, value: selectResourceOptions },
    getSelectResourceOptions,
  ] = useAsyncFn(() => resourceService.getSelectResourceOptions())

  return (
    <SelectField
      error={queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label="Resource"
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && !selectResourceOptions) {
          await getSelectResourceOptions()
        }
      }}
      optionFilterProp="label"
      options={selectResourceOptions}
      showSearch
    />
  )
}

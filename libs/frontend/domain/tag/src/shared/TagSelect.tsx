import { useStore } from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export interface TagSelectProps {
  label: string
  name: string
}

export const TagSelect = observer<TagSelectProps>(({ label, name }) => {
  const { tagService } = useStore()
  const tagOptions = tagService.tagsSelectOptions

  return (
    <SelectField
      label={label}
      name={name}
      optionFilterProp="label"
      options={tagOptions}
      showSearch
    />
  )
})

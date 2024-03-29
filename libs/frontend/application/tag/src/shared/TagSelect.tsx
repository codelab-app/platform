import { useStore } from '@codelab/frontend/application/shared/store'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export interface TagSelectProps {
  label: string
  name: string
}

export const TagSelect: React.FunctionComponent<TagSelectProps> =
  observer<TagSelectProps>(({ label, name }) => {
    const { tagService } = useStore()
    const tagOptions = tagService.tagDomainService.tagsSelectOptions

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

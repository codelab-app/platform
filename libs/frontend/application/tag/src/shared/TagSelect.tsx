import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { SelectField } from 'uniforms-antd'

export interface TagSelectProps {
  label: string
  name: string
}

export const TagSelect: React.FunctionComponent<TagSelectProps> =
  observer<TagSelectProps>(({ label, name }) => {
    const { tagDomainService } = useDomainStore()
    const tagOptions = tagDomainService.tagsSelectOptions

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

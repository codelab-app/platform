'use client'

import type { ITagModel } from '@codelab/frontend-abstract-domain'
import type { IFormController } from '@codelab/frontend-abstract-types'
import type { IUpdateTagData } from '@codelab/shared-abstract-core'

import { UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { AutoFields, SelectField } from 'uniforms-antd'

import { useTagService } from '../../services'
import { updateTagSchema } from './update-tag.schema'

interface IUpdateTagFormProps extends IFormController {
  tag: ITagModel
}

export const UpdateTagForm = observer((props: IUpdateTagFormProps) => {
  const tagService = useTagService()
  const { tagDomainService } = useDomainStore()
  const { onSubmitSuccess, showFormControl = true, submitRef, tag } = props

  const options = tagDomainService.tagsSelectOptions.filter(
    (option) => option.value !== tag.id,
  )

  const model = {
    id: tag.id,
    name: tag.name,
    owner: tag.owner,
    parent: tag.parent ? { id: tag.parent.id } : undefined,
  }

  const onSubmit = (tagDto: IUpdateTagData) => tagService.update(tagDto)

  return (
    <Form<IUpdateTagData>
      errorMessage="Error while updating tag"
      model={model}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      schema={updateTagSchema}
      submitRef={submitRef}
      uiKey={UiKey.TagFormUpdate}
    >
      <AutoFields omitFields={['id', 'parent', 'owner']} />

      {model.parent && (
        <SelectField
          label="Parent Tag"
          name="parent.id"
          optionFilterProp="label"
          options={options}
          showSearch
        />
      )}

      <DisplayIf condition={showFormControl}>
        <FormController submitLabel="Update Tag" />
      </DisplayIf>
    </Form>
  )
})

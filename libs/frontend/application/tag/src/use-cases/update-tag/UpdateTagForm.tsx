import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend/infra/mobx'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import type { IUpdateTagData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { updateTagSchema } from './update-tag.schema'

export const UpdateTagForm = observer(() => {
  const { tagService } = useStore()
  const tag = tagService.updateForm.tag

  const options = tagService.tagDomainService.tagsSelectOptions.filter(
    (option) => option.value !== tag?.id,
  )

  const model = {
    id: tag?.id,
    name: tag?.name,
    parent: tag?.parent ? { id: tag.parent.id } : undefined,
  }

  const onSubmit = (tagDTO: IUpdateTagData) => {
    void tagService.update(tagDTO)

    return Promise.resolve()
  }

  return tag ? (
    <Form<IUpdateTagData>
      model={model}
      onSubmit={onSubmit}
      onSubmitError={createFormErrorNotificationHandler({
        title: 'Error while updating tag',
      })}
      schema={updateTagSchema}
      uiKey={MODEL_ACTION.UpdateTag.key}
    >
      <AutoFields omitFields={['id', 'parent']} />

      <SelectField
        label="Parent Tag"
        name="parent.id"
        optionFilterProp="label"
        options={options}
        showSearch
      />

      <FormController submitLabel="Update Tag" />
    </Form>
  ) : null
})

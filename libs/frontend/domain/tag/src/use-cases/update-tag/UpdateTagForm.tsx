import type { IUpdateTagData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { Form, FormController } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { updateTagSchema } from './update-tag.schema'

export const UpdateTagForm = observer(() => {
  const { tagService } = useStore()
  const tag = tagService.updateForm.tag as IUpdateTagData | undefined

  const options = tagService.tagsSelectOptions.filter(
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
      onSubmitError={createNotificationHandler({
        title: 'Error while updating tag',
      })}
      schema={updateTagSchema}
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

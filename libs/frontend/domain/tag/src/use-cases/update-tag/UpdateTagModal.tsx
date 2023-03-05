import type {
  ITagService,
  IUpdateTagData,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { updateTagSchema } from './updateTagSchema'

export const UpdateTagModal = observer<{ tagService: ITagService }>(
  ({ tagService }) => {
    const tag = tagService.updateModal.tag as IUpdateTagData | undefined

    const options = tagService.tagsSelectOptions.filter(
      (option) => option.value !== tag?.id,
    )

    const model = {
      id: tag?.id,
      name: tag?.name,
      parent: tag?.parent ? { id: tag.parent.id } : undefined,
    }

    const onSubmit = (tagDTO: IUpdateTagData) => {
      return tagService.update(tagDTO)
    }

    const closeModal = () => tagService.updateModal.close()

    return (
      <ModalForm.Modal
        okText="Update Tag"
        onCancel={closeModal}
        open={tagService.updateModal.isOpen}
      >
        <ModalForm.Form<IUpdateTagData>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={createNotificationHandler({
            title: 'Error while updating tag',
          })}
          onSubmitSuccess={closeModal}
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
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

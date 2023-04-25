import type { IUpdateTagData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { updateTagSchema } from './update-tag.schema'

export const UpdateTagModal = observer(() => {
  const { tagService } = useStore()
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
})

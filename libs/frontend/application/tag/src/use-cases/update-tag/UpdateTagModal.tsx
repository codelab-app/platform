import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-view/components'
import type { IUpdateTagData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { updateTagSchema } from './update-tag.schema'

export const UpdateTagModal = observer(() => {
  const { tagService } = useStore()
  const tag = tagService.updateModal.tag

  const options = tagService.tagDomainService.tagsSelectOptions.filter(
    (option) => option.value !== tag?.id,
  )

  const model = {
    id: tag?.id,
    name: tag?.name,
    parent: tag?.parent ? { id: tag.parent.id } : undefined,
  }

  const closeModal = () => tagService.updateModal.close()

  const onSubmit = (tagDTO: IUpdateTagData) => {
    void tagService.update(tagDTO)

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Update Tag"
      onCancel={closeModal}
      open={tagService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateTagData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating tag',
        })}
        onSubmitSuccess={closeModal}
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
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

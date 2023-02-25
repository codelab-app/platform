import type {
  ITagService,
  IUpdateTagDTO,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import type { UpdateTagSchema } from './updateTagSchema'
import { updateTagSchema } from './updateTagSchema'

export const UpdateTagModal = observer<{ tagService: ITagService }>(
  ({ tagService }) => {
    const tag = tagService.updateModal.tag

    const onSubmit = (tagDTO: IUpdateTagDTO) => {
      return tagService.update(tagDTO)
    }

    const closeModal = () => tagService.updateModal.close()

    return (
      <ModalForm.Modal
        okText="Update Tag"
        onCancel={closeModal}
        open={tagService.updateModal.isOpen}
      >
        <ModalForm.Form<UpdateTagSchema>
          model={{ name: tag?.name }}
          onSubmit={onSubmit}
          onSubmitError={createNotificationHandler({
            title: 'Error while updating tag',
          })}
          onSubmitSuccess={closeModal}
          schema={updateTagSchema}
        >
          <AutoFields omitFields={['id']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

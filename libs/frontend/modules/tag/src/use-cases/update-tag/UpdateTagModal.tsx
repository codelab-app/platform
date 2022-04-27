import { TAG_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IUpdateTagDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { updateTagSchema } from './updateTagSchema'

export const UpdateTagModal = observer<WithServices<TAG_SERVICE>>(
  ({ tagService }) => {
    const tag = tagService.updateModal.tag

    const onSubmit = (input: IUpdateTagDTO) => {
      if (!tag) {
        throw new Error('Updated tag is not set')
      }

      return tagService.update(tag, input)
    }

    const closeModal = () => tagService.updateModal.close()

    return (
      <ModalForm.Modal
        okText="Update Tag"
        onCancel={closeModal}
        visible={tagService.updateModal.isOpen}
      >
        <ModalForm.Form<IUpdateTagDTO>
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

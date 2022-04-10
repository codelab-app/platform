import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { WithTagService } from '../../store/tag.service'
import { UpdateTagData, updateTagSchema } from './updateTagSchema'

export const UpdateTagModal = observer<WithTagService>(({ tagService }) => {
  const tag = tagService.updateModal.tag

  const onSubmit = (input: UpdateTagData) => {
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
      <ModalForm.Form<UpdateTagData>
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
})

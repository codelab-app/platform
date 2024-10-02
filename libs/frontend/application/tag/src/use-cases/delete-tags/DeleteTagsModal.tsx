'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { AutoFields, ListField } from 'uniforms-antd'

import type { DeleteTagsData } from './delete-tags.schema'

import { useTagService } from '../../services'
import { deleteTagsSchema } from './delete-tags.schema'
import { useDeleteTagsModal } from './delete-tags.state'

export const DeleteTagsModal = observer(() => {
  const deleteTagsModal = useDeleteTagsModal()
  const tagService = useTagService()
  const tags = deleteTagsModal.data
  const closeModal = () => deleteTagsModal.close()

  const onSubmit = () => {
    void tagService.removeMany(tags ?? [])

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Delete Tags"
      onCancel={closeModal}
      open={deleteTagsModal.isOpen}
      title={<span className="font-semibold">Delete tags</span>}
      uiKey={UiKey.TagModalDelete}
    >
      <ModalForm.Form<DeleteTagsData>
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting tags',
        })}
        onSubmitSuccess={closeModal}
        schema={deleteTagsSchema}
      >
        Are you sure you want to delete{' '}
        {tags?.map((tag) => tag.name).join(', ')}
        ?
        <AutoFields omitFields={['ids']} />
        <ListField hidden={true} itemProps={{}} name="ids" />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

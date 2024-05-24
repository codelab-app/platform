import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, ListField } from 'uniforms-antd'
import type { DeleteTagsData } from './delete-tags.schema'
import { deleteTagsSchema } from './delete-tags.schema'

export const DeleteTagsModal = observer(() => {
  const { tagService } = useStore()
  const tags = tagService.deleteManyModal.tags
  const closeModal = () => tagService.deleteManyModal.close()

  const onSubmit = () => {
    void tagService.delete(tags?.map((tag) => tag.id) ?? [])

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Delete Tags"
      onCancel={closeModal}
      open={tagService.deleteManyModal.isOpen}
      title={<span className="font-semibold">Delete tags</span>}
    >
      <ModalForm.Form<DeleteTagsData>
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting tags',
        })}
        onSubmitSuccess={closeModal}
        schema={deleteTagsSchema}
        uiKey={MODEL_ACTION.DeleteTag.key}
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

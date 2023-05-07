import { useStore } from '@codelab/frontend/presentation/container'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
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
      title={<span css={tw`font-semibold`}>Delete tags</span>}
    >
      <ModalForm.Form<DeleteTagsData>
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
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

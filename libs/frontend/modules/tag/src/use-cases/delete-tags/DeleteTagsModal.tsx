import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields, ListField } from 'uniforms-antd'
import { WithTagService } from '../../store/tag.service'
import { DeleteTagsData, deleteTagsSchema } from './deleteTagsSchema'

export const DeleteTagsModal = observer<WithTagService>(({ tagService }) => {
  // const deleteTags = data?.tags
  //   .filter((tag) => deleteIds?.includes(tag.id))
  //   .map((tag) => tag.name)
  //   .sort()

  const tags = tagService.deleteModal.tags
  const onSubmit = () => tagService.delete(tags)
  const closeModal = () => tagService.deleteModal.close()

  return (
    <ModalForm.Modal
      okText="Delete Tags"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Delete tags</span>}
      visible={tagService.deleteModal.isOpen}
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
        Are you sure you want to delete {tags?.join(', ')}?
        <AutoFields omitFields={['ids']} />
        <ListField hidden={true} itemProps={{}} name="ids" />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

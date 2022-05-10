import { TAG_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields, ListField } from 'uniforms-antd'
import { DeleteTagsData, deleteTagsSchema } from './deleteTagsSchema'

export const DeleteTagsModal = observer<WithServices<TAG_SERVICE>>(
  ({ tagService }) => {
    const tags = tagService.deleteManyModal.tags
    const onSubmit = () => tagService.deleteMany(tags.map((tag) => tag.id))
    const closeModal = () => tagService.deleteManyModal.close()

    return (
      <ModalForm.Modal
        okText="Delete Tags"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Delete tags</span>}
        visible={tagService.deleteManyModal.isOpen}
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
          {tags.map((tag) => tag.label).join(', ')}
          ?
          <AutoFields omitFields={['ids']} />
          <ListField hidden={true} itemProps={{}} name="ids" />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

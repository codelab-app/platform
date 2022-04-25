import { ELEMENT_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { DeleteElementData, deleteElementSchema } from './deleteElementSchema'

export const DeleteElementModal = observer<WithServices<ELEMENT_SERVICE>>(
  ({ elementService }) => {
    const closeModal = () => elementService.deleteModal.close()

    const onSubmit = ({ elementId }: DeleteElementData) => {
      return elementService.deleteElementSubgraph(elementId)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting element',
    })

    if (!elementService.deleteModal.element) {
      return null
    }

    const model = { elementId: elementService.deleteModal.element.id }
    const elementToDelete = elementService.deleteModal.element

    return (
      <ModalForm.Modal
        okText="Delete"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Delete element</span>}
        visible={elementService.deleteModal.isOpen}
      >
        <ModalForm.Form<DeleteElementData>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={deleteElementSchema}
        >
          <h4>
            Are you sure you want to delete
            {elementToDelete?.name
              ? `the element "${elementToDelete?.name}"`
              : 'that element'}
            ?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

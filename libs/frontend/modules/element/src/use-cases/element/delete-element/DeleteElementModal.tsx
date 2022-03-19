import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { DeleteElementInput } from '@codelab/shared/abstract/codegen'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { ElementModel, ElementStore } from '../../../store'
import { deleteElementSchema } from './deleteElementSchema'

export interface DeleteElementModalProps {
  element: ElementModel
  elementStore: ElementStore
}

export const DeleteElementModal = observer<DeleteElementModalProps>(
  ({ element, elementStore }) => {
    const closeModal = () => elementStore.deleteModal.close()

    const onSubmit = async ({ elementId }: DeleteElementInput) => {
      await elementStore.deleteElementsSubgraph(elementId)
      closeModal()
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting element',
    })

    if (!elementStore.deleteModal.element) {
      return null
    }

    const model = { elementId: elementStore.deleteModal.element.id }
    const deletedElement = elementStore.deleteModal.element

    return (
      <ModalForm.Modal
        okText="Delete"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Delete element</span>}
        visible={elementStore.deleteModal.isOpen}
      >
        <ModalForm.Form<DeleteElementInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={deleteElementSchema}
        >
          <h4>
            Are you sure you want to delete
            {deletedElement?.name
              ? `the element "${deletedElement?.name}"`
              : 'that element'}
            ?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

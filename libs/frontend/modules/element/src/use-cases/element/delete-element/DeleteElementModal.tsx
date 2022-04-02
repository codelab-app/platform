import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { DeleteElementInput } from '@codelab/shared/abstract/codegen'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { WithElementService } from '../../../store'
import { deleteElementSchema } from './deleteElementSchema'

export type DeleteElementModalProps = WithElementService

export const DeleteElementModal = observer<DeleteElementModalProps>(
  ({ elementService }) => {
    const closeModal = () => elementService.deleteModal.close()

    const onSubmit = async ({ elementId }: DeleteElementInput) => {
      await elementService.deleteElementsSubgraph(elementId)
      closeModal()
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting element',
    })

    if (!elementService.deleteModal.element) {
      return null
    }

    const model = { elementId: elementService.deleteModal.element.id }
    const deletedElement = elementService.deleteModal.element

    return (
      <ModalForm.Modal
        okText="Delete"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Delete element</span>}
        visible={elementService.deleteModal.isOpen}
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

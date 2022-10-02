import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IBuilderService, IElementService } from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { elementRef } from '../../../store'
import { DeleteElementData, deleteElementSchema } from './deleteElementSchema'

interface DeleteElementModalProps {
  elementService: IElementService
  builderService: IBuilderService
}

export const DeleteElementModal = observer<DeleteElementModalProps>(
  ({ elementService, builderService }) => {
    const closeModal = () => elementService.deleteModal.close()

    if (!elementService.deleteModal.element) {
      return null
    }

    const model = { elementId: elementService.deleteModal.element.id }
    const elementToDelete = elementService.deleteModal.element
    const parentElement = elementToDelete.parentElement

    const onSubmit = ({ elementId }: DeleteElementData) => {
      return elementService
        .deleteElementSubgraph(elementId)
        .then(
          () =>
            parentElement &&
            builderService.set_selectedNode(elementRef(parentElement)),
        )
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting element',
    })

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
            Are you sure you want to delete{' '}
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

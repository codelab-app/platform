import type {
  IBuilderService,
  IElementService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { elementRef } from '../../../store'
import type { DeleteElementData } from './deleteElementSchema'
import { deleteElementSchema } from './deleteElementSchema'

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

    const model = { element: { id: elementService.deleteModal.element.id } }
    const elementToDelete = elementService.deleteModal.element
    const parentElement = elementToDelete.parentElement

    const onSubmit = ({ element }: DeleteElementData) => {
      return elementService
        .deleteElementSubgraph(element.id)
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
        open={elementService.deleteModal.isOpen}
        title={<span css={tw`font-semibold`}>Delete element</span>}
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
            {elementToDelete.name
              ? `the element "${elementToDelete.name}"`
              : 'that element'}
            ?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

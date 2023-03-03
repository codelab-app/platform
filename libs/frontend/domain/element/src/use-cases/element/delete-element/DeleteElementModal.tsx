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

    const { parent: parentElement, ...elementToDelete } =
      elementService.deleteModal.element

    const model = { element: elementToDelete }

    const onSubmit = ({ element }: DeleteElementData) => {
      // Don't wait so we don't block the UI
      void elementService.deleteElementSubgraph(element)

      parentElement && builderService.setSelectedNode(parentElement)

      return Promise.resolve()
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

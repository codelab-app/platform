import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ModalForm } from '@codelab/frontend-presentation-view/components'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import type { DeleteElementData } from './delete-element.schema'
import { deleteElementSchema } from './delete-element.schema'

export const DeleteElementModal = observer(() => {
  const { elementService } = useStore()
  const closeModal = () => elementService.deleteModal.close()

  if (!elementService.deleteModal.element) {
    return null
  }

  const model = { element: { id: elementService.deleteModal.element.id } }
  const elementToDelete = elementService.deleteModal.element

  const onSubmit = ({ element }: DeleteElementData) => {
    const targetElement = elementService.element(element.id)

    // Don't wait so we don't block the UI
    void elementService.delete(targetElement)

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Delete"
      onCancel={closeModal}
      open={elementService.deleteModal.isOpen}
      title={<span className="font-semibold">Delete element</span>}
    >
      <ModalForm.Form<DeleteElementData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting element',
        })}
        onSubmitSuccess={closeModal}
        schema={deleteElementSchema}
        uiKey={MODEL_ACTION.DeleteElement.key}
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
})

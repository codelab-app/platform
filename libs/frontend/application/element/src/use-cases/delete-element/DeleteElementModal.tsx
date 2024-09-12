'use client'
import type { IBuilderService } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { useElementService } from '../../services'
import type { DeleteElementData } from './delete-element.schema'
import { deleteElementSchema } from './delete-element.schema'
import { useDeleteElementModal } from './delete-element.state'
import { deleteElementUseCase } from './delete-element.use-case'

export const DeleteElementModal = observer<{
  selectPreviousElementOnDelete: IBuilderService['selectPreviousElementOnDelete']
}>(({ selectPreviousElementOnDelete }) => {
  const elementService = useElementService()
  const deleteElementModal = useDeleteElementModal()
  const { elementDomainService } = useDomainStore()
  const closeModal = () => deleteElementModal.close()
  const elementToDelete = deleteElementModal.data

  if (!elementToDelete) {
    return null
  }

  const model = { element: { id: elementToDelete.id } }

  const onSubmit = ({ element }: DeleteElementData) => {
    const targetElement = elementService.getElement(element.id)

    // Don't wait so we don't block the UI
    void deleteElementUseCase(
      targetElement,
      elementDomainService,
      selectPreviousElementOnDelete,
    )

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Delete"
      onCancel={closeModal}
      open={deleteElementModal.isOpen}
      title={<span className="font-semibold">Delete element</span>}
      uiKey={UiKey.DeleteElementModal}
    >
      <ModalForm.Form<DeleteElementData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting element',
        })}
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
})

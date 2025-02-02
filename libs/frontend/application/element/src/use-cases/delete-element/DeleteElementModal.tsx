'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import type { DeleteElementData } from './delete-element.schema'

import { useElementService } from '../../services'
import { deleteElementSchema } from './delete-element.schema'
import { deleteElementUseCase } from './delete-element.use-case'

export const DeleteElementModal = observer<{
  id: string
}>(({ id }) => {
  const { builderService } = useApplicationStore()
  const router = useRouter()
  const elementService = useElementService()
  const { elementDomainService } = useDomainStore()
  const closeModal = () => elementService.deletePopover.close(router)
  const elementToDelete = elementDomainService.elements.get(id)

  if (!elementToDelete) {
    return null
  }

  const model = { element: { id: elementToDelete.id } }

  const onSubmit = ({ element }: DeleteElementData) => {
    const targetElement = elementDomainService.element(element.id)

    return deleteElementUseCase(targetElement, elementDomainService, () =>
      builderService.selectPreviousElementOnDelete(),
    )
  }

  return (
    <ModalForm.Modal
      okText="Delete"
      onCancel={closeModal}
      open={true}
      title={<span className="font-semibold">Delete element</span>}
      uiKey={UiKey.ElementModalDelete}
    >
      <ModalForm.Form<DeleteElementData>
        errorMessage="Error while deleting element"
        model={model}
        onSubmit={onSubmit}
        onSubmitSuccess={closeModal}
        schema={deleteElementSchema}
        successMessage="Element deleted"
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

'use client'

import type { IBuilderRoute } from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'

import { UiKey } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import type { DeleteElementData } from './delete-element.schema'

import { useElementService } from '../../services'
import { deleteElementSchema } from './delete-element.schema'

export const DeleteElementModal = observer<{
  element: IElementModel
  context: IBuilderRoute
}>(({ context, element }) => {
  const router = useRouter()
  const elementService = useElementService()
  const { elementDomainService } = useDomainStore()
  const closeModal = () => elementService.deletePopover.close(router, context)
  const model = { element: { id: element.id } }

  const onSubmit = (data: DeleteElementData) => {
    const targetElement = elementDomainService.element(data.element.id)

    return elementService.remove(targetElement)
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
          {element.name ? `the element "${element.name}"` : 'that element'}?
        </h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

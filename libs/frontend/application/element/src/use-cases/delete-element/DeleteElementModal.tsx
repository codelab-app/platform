'use client'

import type { IBuilderRoute } from '@codelab/frontend-abstract-application'
import type { IElementModel } from '@codelab/frontend-abstract-domain'

import { UiKey } from '@codelab/frontend-abstract-types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useElementService } from '../../services'

export const DeleteElementModal = observer<{
  element: IElementModel
  context: IBuilderRoute
}>(({ context, element }) => {
  const router = useRouter()
  const elementService = useElementService()
  const closeModal = () => elementService.deletePopover.close(router, context)

  const onSubmit = () => elementService.remove(element)

  return (
    <ModalForm.Modal
      okText="Delete"
      onCancel={closeModal}
      open={true}
      title={<span className="font-semibold">Delete element</span>}
      uiKey={UiKey.ElementModalDelete}
    >
      <ModalForm.Form
        errorMessage="Error while deleting element"
        model={{}}
        onSubmit={onSubmit}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
        successMessage="Element deleted"
      >
        <h4>Are you sure you want to delete the element "{element.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  emptyJsonSchema,
  type EmptyJsonSchemaType,
} from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useFieldService } from '../../services'

export const DeleteFieldModal = observer<{ id: string }>(({ id }) => {
  const router = useRouter()
  const fieldService = useFieldService()
  const closeModal = router.back
  const field = fieldService.getOneFromCache({ id })

  if (!field) {
    return null
  }

  return (
    <ModalForm.Modal
      okText="Delete"
      onCancel={closeModal}
      open={true}
      title={<span className="font-semibold">Delete field</span>}
      uiKey={UiKey.FieldModalDelete}
    >
      <ModalForm.Form<EmptyJsonSchemaType>
        errorMessage="Error while deleting field"
        model={{}}
        onSubmit={() => fieldService.removeMany([field])}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>
          Are you sure you want to delete field "{field.name ?? field.key}"?
        </h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

DeleteFieldModal.displayName = 'DeleteFieldModal'

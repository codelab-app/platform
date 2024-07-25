import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend/infra/mobx'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  emptyJsonSchema,
  type EmptyJsonSchemaType,
} from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteFieldModal = observer(() => {
  const { fieldService } = useStore()
  const closeModal = () => fieldService.deleteModal.close()
  const { field } = fieldService.deleteModal

  if (!field) {
    return null
  }

  return (
    <ModalForm.Modal
      okButtonProps={{ danger: true }}
      okText="Delete"
      onCancel={closeModal}
      open={fieldService.deleteModal.isOpen}
      title={<span className="font-semibold">Delete field</span>}
    >
      <ModalForm.Form<EmptyJsonSchemaType>
        model={{}}
        onSubmit={(input) => {
          return fieldService.delete([field])
        }}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting field',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.DeleteField.key}
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

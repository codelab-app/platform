'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  emptyJsonSchema,
  type EmptyJsonSchemaType,
} from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useFieldService } from '../../services'
import { useDeleteFieldModal } from './delete-field.state'

export const DeleteFieldModal = observer(() => {
  const deleteFieldModal = useDeleteFieldModal()
  const fieldService = useFieldService()
  const closeModal = () => deleteFieldModal.close()
  const field = deleteFieldModal.data

  if (!field) {
    return null
  }

  return (
    <ModalForm.Modal
      okButtonProps={{ danger: true }}
      okText="Delete"
      onCancel={closeModal}
      open={deleteFieldModal.isOpen}
      title={<span className="font-semibold">Delete field</span>}
      uiKey={UiKey.DeleteFieldModal}
    >
      <ModalForm.Form<EmptyJsonSchemaType>
        model={{}}
        onSubmit={(input) => {
          return fieldService.remove([field])
        }}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting field',
        })}
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

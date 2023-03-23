import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import type { EmptyJsonSchemaType } from '@codelab/frontend/view/components'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
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
      className="delete-field-modal"
      okButtonProps={{ danger: true }}
      okText="Delete"
      onCancel={closeModal}
      open={fieldService.deleteModal.isOpen}
      title={<span css={tw`font-semibold`}>Delete field</span>}
    >
      <ModalForm.Form<EmptyJsonSchemaType>
        model={{}}
        onSubmit={(input) => {
          return fieldService.delete([field])
        }}
        onSubmitError={createNotificationHandler({
          title: 'Error while deleting field',
          type: 'error',
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

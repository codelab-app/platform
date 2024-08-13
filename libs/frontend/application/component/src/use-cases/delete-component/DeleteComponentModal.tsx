import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useComponentService } from '../../services'
import { useDeleteComponentModal } from './delete-component.state'

export const DeleteComponentModal = observer(() => {
  const deleteModal = useDeleteComponentModal()
  const componentService = useComponentService()
  const closeModal = () => deleteModal.close()
  const component = deleteModal.data

  const onSubmit = () => {
    if (!component) {
      return Promise.reject()
    }

    return componentService.remove([component])
  }

  return (
    <ModalForm.Modal
      okText="Delete Component"
      onCancel={closeModal}
      open={deleteModal.isOpen}
      uiKey={UiKey.DeleteComponentModal}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting component',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete component "{component?.name}"?</h4>
        <AutoFields omitFields={['id']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

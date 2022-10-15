import { IComponentService } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteComponentModal = observer<{
  componentService: IComponentService
}>(({ componentService }) => {
  const closeModal = () => componentService.deleteModal.close()
  const component = componentService.deleteModal.component

  if (!component) {
    return null
  }

  const onSubmit = () => componentService.delete([component.id])

  return (
    <ModalForm.Modal
      okText="Delete Component"
      onCancel={closeModal}
      visible={componentService.deleteModal.isOpen}
    >
      <ModalForm.Form
        model={{ id: component.id }}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while deleting component',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete component "{component.name}"?</h4>
        <AutoFields omitFields={['id']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

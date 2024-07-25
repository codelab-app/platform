import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useDeleteComponentModal } from './delete-component.state'
import { deleteComponentUseCase } from './delete-component.use-case'

export const DeleteComponentModal = observer(() => {
  const deleteModal = useDeleteComponentModal()
  const closeModal = () => deleteModal.close()
  const component = deleteModal.data as IComponentModel | null
  const onSubmit = () => deleteComponentUseCase(component!)

  return (
    <ModalForm.Modal
      okText="Delete Component"
      onCancel={closeModal}
      open={deleteModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting component',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.DeleteComponent.key}
      >
        <h4>Are you sure you want to delete component "{component?.name}"?</h4>
        <AutoFields omitFields={['id']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

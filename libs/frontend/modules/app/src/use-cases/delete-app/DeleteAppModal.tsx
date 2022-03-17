import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { AppStore } from '../../store'

export interface DeleteAppModalProps {
  apps: AppStore
}

export const DeleteAppModal = observer<DeleteAppModalProps>(({ apps }) => {
  const app = apps.deleteModal.app

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting app',
  })

  const closeModal = () => apps.deleteModal.close()

  const onSubmit = () => {
    if (!app) {
      return Promise.reject('App not defined in DeleteAppModal')
    }

    const promise = apps.delete(app.id)
    closeModal()

    return promise
  }

  return (
    <ModalForm.Modal
      okText="Delete App"
      onCancel={closeModal}
      visible={apps.deleteModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        {' '}
        <h4>Are you sure you want to delete app "{app?.name}"?</h4>
        <AutoFields omitFields={['appId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

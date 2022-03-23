import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { AppService, WithAppService } from '../../store'

export const DeleteAppModal = observer<WithAppService>(({ appService }) => {
  const app = appService.selectedRef?.current

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting app',
  })

  const closeModal = () => appService.deleteModal.close()

  const onSubmit = () => {
    if (!app) {
      return Promise.reject('App not defined in DeleteAppModal')
    }

    return appService.delete(app.id)
  }

  return (
    <ModalForm.Modal
      okText="Delete App"
      onCancel={closeModal}
      visible={appService.deleteModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete app "{app?.name}"?</h4>
        <AutoFields omitFields={['appId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAppService } from '../../services'
import { useDeleteAppModal } from './delete-app.state'

export const DeleteAppModal = observer(() => {
  const deleteAppModal = useDeleteAppModal()
  const appService = useAppService()
  const closeModal = () => deleteAppModal.close()
  const app = deleteAppModal.data

  const onSubmit = async () => {
    if (!app) {
      return Promise.reject()
    }

    return await appService.remove([app])
  }

  return (
    <ModalForm.Modal
      okText="Delete App"
      onCancel={closeModal}
      open={deleteAppModal.isOpen}
      uiKey={UiKey.DeleteAppModal}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting app',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete app "{app?.name}"?</h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

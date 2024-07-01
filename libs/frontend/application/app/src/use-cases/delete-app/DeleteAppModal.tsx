'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useDeleteAppModal } from './delete-app.state'
import { deleteAppUseCase } from './delete-app.use-case'

export const DeleteAppModal = observer(() => {
  const deleteAppModal = useDeleteAppModal()
  const closeModal = () => deleteAppModal.close()
  const app = deleteAppModal.data as Maybe<IAppModel>

  const onSubmit = async () => {
    if (!app) {
      return Promise.reject()
    }

    return await deleteAppUseCase(app)
  }

  return (
    <ModalForm.Modal
      okText="Delete App"
      onCancel={closeModal}
      open={deleteAppModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting app',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.DeleteApp.key}
      >
        <h4>Are you sure you want to delete app "{app?.name}"?</h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

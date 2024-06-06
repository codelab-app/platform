'use client'

import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  emptyJsonSchema,
  ModalForm,
} from '@codelab/frontend-presentation-view/components/form'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const DeleteAppModal = observer(() => {
  const { appService, domainService } = useStore()
  const app = appService.deleteModal.app
  const closeModal = () => appService.deleteModal.close()

  const onSubmit = () => {
    if (!app) {
      return Promise.reject()
    }

    // app.domains.forEach(async (domain) => {
    //   const existingDomain = domainService.domains.get(domain.id)

    //   if (existingDomain) {
    //     await domainService.delete([existingDomain])
    //   }
    // })

    return appService.delete([app])
  }

  return (
    <ModalForm.Modal
      okText="Delete App"
      onCancel={closeModal}
      open={appService.deleteModal.isOpen}
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

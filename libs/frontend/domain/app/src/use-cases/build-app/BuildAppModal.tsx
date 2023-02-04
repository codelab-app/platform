import type { IAppService } from '@codelab/frontend/abstract/core'
import { regenerateAppPages } from '@codelab/frontend/domain/domain'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const BuildAppModal = observer<{
  appService: IAppService
}>(({ appService }) => {
  const app = appService.buildModal.app

  const onSubmit = async () => {
    if (app) {
      await regenerateAppPages(app.id)
    }
  }

  const closeModal = () => appService.buildModal.close()

  return (
    <ModalForm.Modal
      okText="Build App"
      onCancel={closeModal}
      open={appService.buildModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while rebuilding app',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to build all pages for "{app?.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

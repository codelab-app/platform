import type { IUpdateAppData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateAppSchema } from './update-app.schema'

export const UpdateAppModal = observer(() => {
  const { appService } = useStore()
  const app = appService.updateModal.app

  const model = {
    id: app?.id,
    name: app?.name,
  }

  const onSubmit = (appDTO: IUpdateAppData) => appService.update(appDTO)
  const closeModal = () => appService.updateModal.close()

  return (
    <ModalForm.Modal
      okText="Update App"
      onCancel={closeModal}
      open={appService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateAppData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating app',
        })}
        onSubmitSuccess={closeModal}
        schema={updateAppSchema}
      >
        <AutoFields omitFields={['storeId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

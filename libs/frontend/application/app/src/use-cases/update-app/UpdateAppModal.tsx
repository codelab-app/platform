import type { IUpdateAppData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ModalForm } from '@codelab/frontend-presentation-view/components'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
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
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating app',
        })}
        onSubmitSuccess={closeModal}
        schema={updateAppSchema}
        uiKey={MODEL_ACTION.UpdateApp.key}
      >
        <AutoFields omitFields={['storeId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

'use client'
import type { ICreateAppData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  useDomainStore,
  useStore,
} from '@codelab/frontend-application-shared-store/provider'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createAppSchema } from './create-app.schema'
import { useCreateAppService } from './create-app.service'
import { useCreateAppModal } from './create-app-modal.state'

export const CreateAppModal = observer(() => {
  const store = useDomainStore()
  const createAppModal = useCreateAppModal()
  const createAppService = useCreateAppService(store)

  const onSubmit = async (appDTO: ICreateAppData) => {
    await createAppService(appDTO)

    closeModal()

    return Promise.resolve()
  }

  const closeModal = () => createAppModal.close()

  const model = {
    id: v4(),
  }

  return (
    <ModalForm.Modal
      okText="Create App"
      onCancel={closeModal}
      open={createAppModal.isOpen}
    >
      <ModalForm.Form<ICreateAppData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating app',
        })}
        onSubmitSuccess={closeModal}
        schema={createAppSchema}
        uiKey={MODEL_ACTION.CreateApp.key}
      >
        <AutoFields omitFields={['storeId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

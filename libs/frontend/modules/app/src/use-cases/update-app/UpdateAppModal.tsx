import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { AppStore } from '../../store'
import { UpdateAppInput, updateAppSchema } from './updateAppSchema'

export interface UpdateAppModalProps {
  apps: AppStore
}

export const UpdateAppModal = observer(({ apps }: UpdateAppModalProps) => {
  const app = apps.updateModal.app

  const onSubmit = (input: UpdateAppInput) => {
    const promise = app?.update(input) ?? Promise.reject()
    closeModal()

    return promise
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating app',
  })

  const closeModal = () => apps.updateModal.close()

  const model = {
    name: app?.name,
  }

  return (
    <ModalForm.Modal
      okText="Update App"
      onCancel={closeModal}
      visible={apps.updateModal.isOpen}
    >
      <ModalForm.Form
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updateAppSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

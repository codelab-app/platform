import {
  ACTION_SERVICE,
  STORE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateActionDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useCurrentStore } from '../../../hooks'
import { createActionSchema } from './createActionSchema'

export const CreateActionModal = observer<
  WithServices<ACTION_SERVICE | STORE_SERVICE>
>(({ actionService, storeService }) => {
  const { store } = useCurrentStore(storeService)
  const closeModal = () => actionService.createModal.close()

  const onSubmit = (input: ICreateActionDTO) => {
    const storeId = store?.id

    if (!storeId) {
      throw new Error('Missing storeId')
    }

    return actionService.create({ ...input, storeId: store?.id })
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating action',
  })

  return (
    <ModalForm.Modal
      okText="Create Action"
      onCancel={closeModal}
      visible={actionService.createModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createActionSchema}
      >
        <AutoFields omitFields={['storeId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

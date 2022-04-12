import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useCurrentResource } from '../../../hooks'
import { WithOperationService, WithResourceService } from '../../../store'
import {
  CreateOperationInput,
  createOperationSchema,
} from './createOperationSchema'

type CreateOperationModalProp = WithOperationService & WithResourceService

export const CreateOperationModal = observer<CreateOperationModalProp>(
  ({ operationService, resourceService }) => {
    const { resource } = useCurrentResource(resourceService)
    const closeModal = () => operationService.createModal.close()

    const onSubmit = (input: CreateOperationInput) =>
      operationService.create(input, resource?.id)

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating operation',
    })

    return (
      <ModalForm.Modal
        okText="Create Operation"
        onCancel={closeModal}
        visible={operationService.createModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createOperationSchema}
        >
          <AutoFields omitFields={['storeId']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

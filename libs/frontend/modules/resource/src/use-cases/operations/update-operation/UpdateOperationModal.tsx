import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { WithOperationService } from '../../../store'
import {
  UpdateOperationInput,
  updateOperationSchema,
} from './updateOperationSchema'

export const UpdateOperationModal = observer<WithOperationService>(
  ({ operationService }) => {
    const closeModal = () => operationService.updateModal.close()
    const updateOperation = operationService.updateModal.operation

    const onSubmit = (data: UpdateOperationInput) => {
      if (!updateOperation) {
        throw new Error('Updated operation is not set')
      }

      return operationService.update(updateOperation, data)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating operation',
    })

    const model = {
      name: operationService.updateModal.operation?.name,
    }

    return (
      <ModalForm.Modal
        okText="Update Operation"
        onCancel={closeModal}
        visible={operationService.updateModal.isOpen}
      >
        <ModalForm.Form<UpdateOperationInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={updateOperationSchema}
        >
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

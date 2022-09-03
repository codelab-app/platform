import { ModalForm } from '@codelab/frontend/view/components'
import {
  IAdminService,
  IExecuteCommandDTO,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { AutoFields } from 'uniforms-antd'
import { executeCommandSchema } from './executeCommandSchema'

export const ExecuteCommandModal = observer(
  ({ adminService }: { adminService: IAdminService }) => {
    const closeModal = () => adminService.executeCommandModal.close()

    const onSubmit = async (data: IExecuteCommandDTO) => {
      const results = await adminService.executeCommand(data)

      if (!results.success) {
        throw results
      }

      return results
    }

    const [error, setError] = useState({
      done: false,
      message: '',
    })

    return (
      <ModalForm.Modal
        okText="Execute Command"
        onCancel={closeModal}
        visible={adminService.executeCommandModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={(e) => {
            setError({
              done: true,
              message: e.data,
            })
          }}
          // onSubmitError={createNotificationHandler({
          //   title: 'Error while executing command',
          // })}
          onSubmitSuccess={closeModal}
          schema={executeCommandSchema}
        >
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

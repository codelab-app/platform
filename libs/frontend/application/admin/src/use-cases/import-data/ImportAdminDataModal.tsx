import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { IImportDto } from '@codelab/shared/abstract/core'
import {
  importDtoDefault,
  ImportDtoSchema,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const ImportAdminDataModal = observer(() => {
  const { adminService } = useStore()

  const closeModal = () => {
    adminService.importDataModal.close()
  }

  return (
    <ModalForm.Modal
      okText="Import Admin Data"
      onCancel={closeModal}
      open={adminService.importDataModal.isOpen}
    >
      <ModalForm.Form<IImportDto>
        model={importDtoDefault}
        onSubmit={(data) => adminService.importData(data)}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while importing data',
        })}
        onSubmitSuccess={closeModal}
        schema={ImportDtoSchema}
        uiKey={MODEL_ACTION.ImportDataAdmin.key}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

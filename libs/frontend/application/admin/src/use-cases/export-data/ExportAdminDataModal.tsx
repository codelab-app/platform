import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ExportDto, exportDtoDefault } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const ExportAdminDataModal = observer(() => {
  const { adminService } = useStore()
  const closeModal = () => adminService.exportDataModal.close()

  return (
    <ModalForm.Modal
      okText="Export Admin Data"
      onCancel={closeModal}
      open={adminService.exportDataModal.isOpen}
    >
      <ModalForm.Form<ExportDto>
        key={MODEL_ACTION.ExportDataAdmin.key}
        model={exportDtoDefault}
        onSubmit={(data) => adminService.exportData(data)}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while exporting data',
        })}
        onSubmitSuccess={closeModal}
        schema={ExportDto}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

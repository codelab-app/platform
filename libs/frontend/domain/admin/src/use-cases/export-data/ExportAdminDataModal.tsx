import { useStore } from '@codelab/frontend/presentation/container'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ExportDto, exportDtoDefault } from '@codelab/shared/abstract/core'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
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
        model={exportDtoDefault}
        onSubmit={(data) => {
          return adminService.exportData(data)
        }}
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

import { useStore } from '@codelab/frontend/presentation/container'
import { ModalForm } from '@codelab/frontend/presentation/view'
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
        model={exportDtoDefault}
        onSubmit={() => {
          return adminService.exportData()
        }}
        schema={ExportDto}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { ExportDto } from '@codelab/shared/abstract/core'
import { ImportDto, importDtoDefault } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const ImportAdminDataModal = observer(() => {
  const { adminService } = useStore()
  const closeModal = () => adminService.importDataModal.close()

  return (
    <ModalForm.Modal
      okText="Import Admin Data"
      onCancel={closeModal}
      open={adminService.importDataModal.isOpen}
    >
      <ModalForm.Form<ExportDto>
        model={importDtoDefault}
        onSubmit={(data) => adminService.importData(data)}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while importing data',
        })}
        onSubmitSuccess={closeModal}
        schema={ImportDto}
        uiKey={MODEL_ACTION.ImportDataAdmin.key}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

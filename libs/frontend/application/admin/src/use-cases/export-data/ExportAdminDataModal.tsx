'use client'

import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  exportDtoDefault,
  ExportDtoSchema,
  type IExportDto,
} from '@codelab/shared/abstract/core'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { exportAdminDataAction } from './ExportAdminData.action'
import { useExportAdminDataModal } from './ExportAdminDataModal.state'

export const ExportAdminDataModal = () => {
  const exportDataModal = useExportAdminDataModal()

  return (
    <ModalForm.Modal
      okText="Export Admin Data"
      onCancel={exportDataModal.close}
      open={exportDataModal.isOpen}
    >
      <ModalForm.Form<IExportDto>
        model={exportDtoDefault}
        onSubmit={exportAdminDataAction}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while exporting data',
        })}
        onSubmitSuccess={exportDataModal.close}
        schema={ExportDtoSchema}
        uiKey={MODEL_ACTION.ExportDataAdmin.key}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}

'use client'

import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  createFormErrorNotificationHandler,
  downloadJsonAsFile,
} from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  exportDtoDefault,
  ExportDtoSchema,
  type IExportDto,
} from '@codelab/shared/abstract/core'
import React, { useCallback } from 'react'
import { AutoFields } from 'uniforms-antd'
import { exportAdminDataUseCase } from './export-admin-data.use-case'
import { useExportAdminDataModal } from './ExportAdminDataModal.state'

export const ExportAdminDataModal = () => {
  const exportDataModal = useExportAdminDataModal()

  const onSubmitHandler = useCallback(async (data: IExportDto) => {
    const exportedData = await exportAdminDataUseCase(data)

    if (exportedData) {
      downloadJsonAsFile('export.json', exportedData)
    }
  }, [])

  return (
    <ModalForm.Modal
      okText="Export Admin Data"
      onCancel={exportDataModal.close}
      open={exportDataModal.isOpen}
    >
      <ModalForm.Form<IExportDto>
        model={exportDtoDefault}
        onSubmit={onSubmitHandler}
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

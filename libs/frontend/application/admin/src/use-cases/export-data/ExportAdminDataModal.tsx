'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { downloadJsonAsFile } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  exportDtoDefault,
  ExportDtoSchema,
  type IExportDto,
} from '@codelab/shared/abstract/core'
import { useCallback } from 'react'
import { AutoFields } from 'uniforms-antd'

import { exportAdminDataService } from './export-admin-data.service'
import { useExportAdminDataModal } from './export-admin-data.state'

export const ExportAdminDataModal = () => {
  const exportDataModal = useExportAdminDataModal()

  const onSubmitHandler = async ({ adminDataPath, download }: IExportDto) => {
    const exportedData = await exportAdminDataService({ adminDataPath })

    if (download) {
      downloadJsonAsFile('export.json', exportedData)
    }
  }

  return (
    <ModalForm.Modal
      okText="Export Admin Data"
      onCancel={exportDataModal.close}
      open={exportDataModal.isOpen}
      uiKey={UiKey.AdminDataModalExport}
    >
      <ModalForm.Form<IExportDto>
        errorMessage="Error while exporting data"
        model={exportDtoDefault}
        onSubmit={onSubmitHandler}
        onSubmitSuccess={exportDataModal.close}
        schema={ExportDtoSchema}
        successMessage="Data exported successfully"
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}

'use client'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { downloadJsonAsFile } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  exportDtoDefault,
  ExportDtoSchema,
  type IExportDto,
} from '@codelab/shared/abstract/core'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { exportAdminDataService } from './export-admin-data.service'

export const ExportAdminDataModal = () => {
  const router = useRouter()
  const onClose = () => router.push(RoutePaths.Admin.base())

  const onSubmitHandler = async ({ adminDataPath, download }: IExportDto) => {
    const exportedData = await exportAdminDataService({
      adminDataPath,
      download,
    })

    if (download) {
      downloadJsonAsFile('export.json', exportedData)
    }
  }

  return (
    <ModalForm.Modal
      okText="Export Admin Data"
      onCancel={onClose}
      open={true}
      uiKey={UiKey.AdminDataModalExport}
    >
      <ModalForm.Form<IExportDto>
        errorMessage="Error while exporting data"
        model={exportDtoDefault}
        onSubmit={onSubmitHandler}
        onSubmitSuccess={onClose}
        schema={ExportDtoSchema}
        successMessage="Data exported successfully"
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}

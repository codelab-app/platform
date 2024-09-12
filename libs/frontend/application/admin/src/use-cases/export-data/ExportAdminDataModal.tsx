'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
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
import { useCallback } from 'react'
import { AutoFields } from 'uniforms-antd'
import { useExportAdminDataModal } from './export-admin-data.state'
import { exportAdminDataUseCase } from './export-admin-data.use-case'

export const ExportAdminDataModal = () => {
  const exportDataModal = useExportAdminDataModal()

  const onSubmitHandler = useCallback(async (data: IExportDto) => {
    const exportedData = await exportAdminDataUseCase(data)

    if (exportedData) {
      downloadJsonAsFile('export.json', JSON.parse(exportedData))
    }
  }, [])

  return (
    <ModalForm.Modal
      okText="Export Admin Data"
      onCancel={exportDataModal.close}
      open={exportDataModal.isOpen}
      uiKey={UiKey.ExportAdminDataModal}
    >
      <ModalForm.Form<IExportDto>
        model={exportDtoDefault}
        onSubmit={onSubmitHandler}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while exporting data',
        })}
        onSubmitSuccess={exportDataModal.close}
        schema={ExportDtoSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}

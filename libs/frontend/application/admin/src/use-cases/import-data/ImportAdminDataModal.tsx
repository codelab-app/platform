'use client'

import type { IImportDto } from '@codelab/shared/abstract/core'

import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  importDtoDefault,
  ImportDtoSchema,
} from '@codelab/shared/abstract/core'
import { AutoFields } from 'uniforms-antd'
import { importAdminDataService } from './import-admin-data.service'
import { useImportAdminDataModal } from './import-admin-data.state'

export const ImportAdminDataModal = () => {
  const importDataModal = useImportAdminDataModal()

  return (
    <ModalForm.Modal
      okText="Import Admin Data"
      onCancel={importDataModal.close}
      open={importDataModal.isOpen}
      uiKey={UiKey.AdminDataModalImport}
    >
      <ModalForm.Form<IImportDto>
        errorMessage="Error while importing data"
        model={importDtoDefault}
        onSubmit={importAdminDataService}
        onSubmitSuccess={importDataModal.close}
        schema={ImportDtoSchema}
        successMessage="Data imported successfully"
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}

'use client'

import type { IImportDto } from '@codelab/shared/abstract/core'

import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  importDtoDefault,
  ImportDtoSchema,
} from '@codelab/shared/abstract/core'
import { AutoFields } from 'uniforms-antd'

import { useImportAdminDataModal } from './import-admin-data.state'
import { importAdminDataUseCase } from './import-admin-data.use-case'

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
        onSubmit={importAdminDataUseCase}
        onSubmitSuccess={importDataModal.close}
        schema={ImportDtoSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}

'use client'

import type { IImportDto } from '@codelab/shared-abstract-core'

import { RoutePaths } from '@codelab/frontend-abstract-application'
import { UiKey } from '@codelab/frontend-abstract-types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  importDtoDefault,
  ImportDtoSchema,
} from '@codelab/shared-abstract-core'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { importAdminDataService } from './import-admin-data.service'

export const ImportAdminDataModal = () => {
  const router = useRouter()
  const onClose = () => router.push(RoutePaths.Admin.base())

  return (
    <ModalForm.Modal
      okText="Import Admin Data"
      onCancel={onClose}
      open={true}
      uiKey={UiKey.AdminDataModalImport}
    >
      <ModalForm.Form<IImportDto>
        errorMessage="Error while importing data"
        model={importDtoDefault}
        onSubmit={async (data) => await importAdminDataService(data)}
        onSubmitSuccess={onClose}
        schema={ImportDtoSchema}
        successMessage="Data imported successfully"
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}

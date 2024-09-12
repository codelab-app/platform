'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { IImportDto } from '@codelab/shared/abstract/core'
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
      uiKey={UiKey.ImportAdminDataModal}
    >
      <ModalForm.Form<IImportDto>
        model={importDtoDefault}
        onSubmit={importAdminDataUseCase}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while importing data',
        })}
        onSubmitSuccess={importDataModal.close}
        schema={ImportDtoSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}

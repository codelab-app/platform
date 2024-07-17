'use client'

import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { IImportDto } from '@codelab/shared/abstract/core'
import {
  importDtoDefault,
  ImportDtoSchema,
} from '@codelab/shared/abstract/core'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { importAdminDataUseCase } from './import-admin-data.use-case'
import { useImportAdminDataModal } from './import-admin-data-modal.state'

export const ImportAdminDataModal = () => {
  const importDataModal = useImportAdminDataModal()

  return (
    <ModalForm.Modal
      okText="Import Admin Data"
      onCancel={importDataModal.close}
      open={importDataModal.isOpen}
    >
      <ModalForm.Form<IImportDto>
        model={importDtoDefault}
        onSubmit={importAdminDataUseCase}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while importing data',
        })}
        onSubmitSuccess={importDataModal.close}
        schema={ImportDtoSchema}
        uiKey={MODEL_ACTION.ImportDataAdmin.key}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}

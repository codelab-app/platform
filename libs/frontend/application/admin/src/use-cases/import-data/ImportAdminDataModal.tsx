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
import { importAdminDataAction } from './ImportAdminData.action'
import { useImportAdminDataModal } from './ImportAdminDataModal.state'

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
        onSubmit={importAdminDataAction}
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

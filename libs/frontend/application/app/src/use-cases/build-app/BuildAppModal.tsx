'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useBuildAppModal } from './build-app-modal.state'
import { useBuildApp } from './useBuildApp.hook'

export const BuildAppModal = observer(() => {
  const store = useDomainStore()
  const buildAppModal = useBuildAppModal()
  const app = buildAppModal.data
  const { regenerate } = useBuildApp()
  const onSubmit = async () => regenerate(app as IAppModel)
  const closeModal = () => buildAppModal.close()

  return (
    <ModalForm.Modal
      okText="Build App"
      onCancel={closeModal}
      open={buildAppModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.BuildApp.key}
      >
        <h4>Are you sure you want to build all pages for "{app?.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { regeneratePages } from '@codelab/frontend/domain/domain'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/presentation/view'
import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const BuildAppModal = observer(() => {
  const { appService, domainService } = useStore()
  const app = appService.buildModal.app

  const successNotify = useSuccessNotify({
    description: 'It might take up to an hour for the changes to be visible',
    title: 'App was successfully rebuilt',
  })

  const errorNotify = useErrorNotify({
    description: (error: Error) => error.message,
    title: 'Error while rebuilding app',
  })

  const onSubmit = async () => {
    if (!app) {
      return
    }

    const domains = domainService.domainsList.filter(
      (_domain) => _domain.app.id === app.id,
    )

    for (const domain of domains) {
      const pages = app.pages.map((page) => page.url)
      const response = await regeneratePages(pages, domain.name)

      if (!response.ok) {
        const error = await response.text()

        throw new Error(error)
      }
    }
  }

  const closeModal = () => appService.buildModal.close()

  const onSubmitError = (error: unknown) => {
    errorNotify(error as Error)
    successNotify()
  }

  const onSubmitSuccess = () => {
    closeModal()
    successNotify()
  }

  return (
    <ModalForm.Modal
      okText="Build App"
      onCancel={closeModal}
      open={appService.buildModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={onSubmitSuccess}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.BuildApp.key}
      >
        <h4>Are you sure you want to build all pages for "{app?.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

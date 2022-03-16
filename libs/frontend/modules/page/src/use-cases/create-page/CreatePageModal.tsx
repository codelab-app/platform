import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { CreatePageInput } from '@codelab/shared/abstract/codegen'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { PageStore } from '../../store'
import { createPageSchema } from './createPageSchema'

export interface CreatePageModalProps {
  pages: PageStore
}

export const CreatePageModal = observer(({ pages }: CreatePageModalProps) => {
  const currentAppId = useCurrentAppId()
  const isOpen = pages.createModal.isOpen
  const model = { appId: currentAppId }
  const onSubmit = (input: CreatePageInput) => pages.createPage(input)

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating page',
  })

  const closeModal = () => pages.createModal.close()

  return (
    <ModalForm.Modal
      okText="Create Page"
      onCancel={closeModal}
      visible={isOpen}
    >
      <ModalForm.Form
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createPageSchema}
      >
        <AutoFields omitFields={['appId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})

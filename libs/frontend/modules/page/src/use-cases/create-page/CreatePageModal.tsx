import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { WithPageService } from '../../store'
import { CreatePageData, createPageSchema } from './createPageSchema'

export const CreatePageModal = observer<WithPageService>(({ pageService }) => {
  const currentAppId = useCurrentAppId()
  const isOpen = pageService.createModal.isOpen
  const model = { appId: currentAppId }
  const onSubmit = (input: CreatePageData) => pageService.create(input)

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating page',
  })

  const closeModal = () => pageService.createModal.close()

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

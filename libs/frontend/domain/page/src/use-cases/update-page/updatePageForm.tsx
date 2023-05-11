import type { IUpdatePageData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { Form, FormController } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { type UpdatePageSchema, updatePageSchema } from './update-page.schema'

export const UpdatePageForm = observer(() => {
  const { pageService } = useStore()
  const pageToUpdate = pageService.updateForm.page
  const closeForm = () => pageService.updateForm.close()

  const onSubmit = (data: IUpdatePageData) => {
    void pageService.update(data)
    closeForm()

    return Promise.resolve()
  }

  const model = {
    app: pageToUpdate?.app,
    id: pageToUpdate?.id,
    name: pageToUpdate?.name,
    url: pageToUpdate?.url,
  }

  return (
    <Form<UpdatePageSchema>
      model={model}
      onSubmit={onSubmit}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating page',
      })}
      onSubmitSuccess={closeForm}
      schema={updatePageSchema}
    >
      <AutoFields />
      <FormController onCancel={closeForm} submitLabel="Update Page" />
    </Form>
  )
})

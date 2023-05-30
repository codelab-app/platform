import type { ICreatePageData } from '@codelab/frontend/abstract/core'
import {
  useCurrentApp,
  useStore,
} from '@codelab/frontend/presentation/container'
import { Form, FormController } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createPageSchema } from './create-page.schema'

export const CreatePageForm = observer(() => {
  const { pageService, userService } = useStore()
  const { app } = useCurrentApp()

  const model = {
    app: { id: app?.id },
    id: v4(),
    // required for store api
    owner: {
      auth0Id: userService.auth0Id,
    },
  }

  const closeForm = () => pageService.createForm.close()

  const onSubmit = (data: ICreatePageData) => {
    void pageService.create(data)
    closeForm()

    return Promise.resolve()
  }

  return (
    <Form<ICreatePageData>
      data-testid="create-page-form"
      model={model}
      onSubmit={onSubmit}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating page',
      })}
      schema={createPageSchema}
    >
      <AutoFields />
      <FormController onCancel={closeForm} submitLabel="Create Page" />
    </Form>
  )
})

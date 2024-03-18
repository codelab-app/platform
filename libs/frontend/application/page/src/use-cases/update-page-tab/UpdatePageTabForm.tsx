import type { IAppService } from '@codelab/frontend/abstract/application'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useCurrentPage } from '@codelab/frontend/presentation/container'
import { Form } from '@codelab/frontend/presentation/view'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { schema } from './update-page-tab.schema'

export const UpdatePageTabForm = observer<{
  appService: IAppService
}>(({ appService }) => {
  const page = useCurrentPage()

  if (!page) {
    return null
  }

  const onSubmit = (input: IUpdatePageData) => appService.updatePage(input)
  const { kind, pageContentContainer } = page
  const omitFields = ['appId']

  if (kind !== IPageKind.Provider) {
    omitFields.push('pageContentContainer')
  }

  if (kind !== IPageKind.Regular) {
    omitFields.push('url')
  }

  const model = {
    app: page.app,
    id: page.id,
    name: page.name,
    pageContentContainer: pageContentContainer?.maybeCurrent?.id
      ? { id: pageContentContainer.maybeCurrent.id }
      : null,
    url: page.url,
  }

  return (
    <Form
      autosave={true}
      model={model}
      onSubmit={onSubmit}
      schema={schema(kind)}
      uiKey={MODEL_ACTION.UpdatePage.key}
    >
      <AutoFields omitFields={omitFields} />
    </Form>
  )
})

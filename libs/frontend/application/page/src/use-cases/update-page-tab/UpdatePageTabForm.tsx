import { UiKey } from '@codelab/frontend/abstract/types'
import { useCurrentPage } from '@codelab/frontend/presentation/container'
import { Form } from '@codelab/frontend-presentation-components-form'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { usePageService } from '../../services'
import { schema } from './update-page-tab.schema'

export const UpdatePageTabForm = observer(() => {
  const pageService = usePageService()
  const page = useCurrentPage()

  if (!page) {
    return null
  }

  const onSubmit = (input: IUpdatePageData) => pageService.update(input)
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
    url: page.urlPattern,
  }

  return (
    <Form
      autosave={true}
      model={model}
      onSubmit={onSubmit}
      schema={schema(kind)}
      uiKey={UiKey.UpdatePageForm}
    >
      <AutoFields omitFields={omitFields} />
    </Form>
  )
})

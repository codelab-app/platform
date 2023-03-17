import type {
  IPageService,
  IUpdatePageData,
} from '@codelab/frontend/abstract/core'
import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { Form } from '@codelab/frontend/view/components'
import { IPageKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { schema } from './update-page-tab.schema'

export const UpdatePageTabForm = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const pageId = useCurrentPageId()
    const page = pageService.page(pageId)

    if (!page) {
      return null
    }

    const onSubmit = (input: IUpdatePageData) => pageService.update(input)
    const { kind, pageContentContainer } = page
    const omitFields = ['appId']

    if (kind !== IPageKind.Provider) {
      omitFields.push('pageContentContainer')
    }

    const model = {
      app: page.app,
      id: page.id,
      name: page.name,
      pageContentContainer: pageContentContainer?.maybeCurrent?.id
        ? { id: pageContentContainer.maybeCurrent.id }
        : null,
    }

    return (
      <Form
        autosave={true}
        model={model}
        onSubmit={onSubmit}
        schema={schema(kind)}
      >
        <AutoFields omitFields={omitFields} />
      </Form>
    )
  },
)

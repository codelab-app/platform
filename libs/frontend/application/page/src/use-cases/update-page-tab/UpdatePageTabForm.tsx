import type { IPageModel } from '@codelab/frontend-abstract-domain'
import type { IPageUpdateFormData } from '@codelab/shared-abstract-core'

import { UiKey } from '@codelab/frontend-abstract-types'
import { Form } from '@codelab/frontend-presentation-components-form'
import { IPageKind } from '@codelab/shared-abstract-core'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { usePageService } from '../../services'
import { schema } from './update-page-tab.schema'

export const UpdatePageTabForm = observer<{ page: IPageModel }>(({ page }) => {
  const pageService = usePageService()
  const onSubmit = (input: IPageUpdateFormData) => pageService.update(input)
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
      uiKey={UiKey.PageFormUpdate}
    >
      <AutoFields omitFields={omitFields} />
    </Form>
  )
})

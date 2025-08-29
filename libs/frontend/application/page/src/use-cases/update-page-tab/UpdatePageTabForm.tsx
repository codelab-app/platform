import type { IPageModel } from '@codelab/frontend-abstract-domain'
import type { IPageUpdateFormData } from '@codelab/shared-abstract-core'

import { UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { Form } from '@codelab/frontend-presentation-components-form'
import { IElementTypeKind, IPageKind } from '@codelab/shared-abstract-core'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { usePageService } from '../../services'
import { schema } from './update-page-tab.schema'

export const UpdatePageTabForm = observer<{ page: IPageModel }>(({ page }) => {
  const pageService = usePageService()
  const { elementDomainService } = useDomainStore()
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
    urlPattern: page.urlPattern,
  } as IPageUpdateFormData

  return (
    <Form<IPageUpdateFormData>
      autosave={true}
      model={model}
      onSubmit={onSubmit}
      schema={schema(
        kind,
        elementDomainService.getSelectOptions(
          page.rootElement.current,
          IElementTypeKind.AllElements,
        ),
      )}
      uiKey={UiKey.PageFormUpdate}
    >
      <AutoFields omitFields={omitFields} />
    </Form>
  )
})

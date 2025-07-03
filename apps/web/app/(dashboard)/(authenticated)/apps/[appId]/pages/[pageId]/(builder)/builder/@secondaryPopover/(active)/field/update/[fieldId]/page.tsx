import type { PageProps } from '@codelab/frontend-abstract-types'

import { IRouteType } from '@codelab/frontend-abstract-application'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'
import { UpdateFieldPopoverContainer } from '@codelab/frontend-application-type/use-cases/update-field'

const Page = async (
  props: PageProps<'appId' | 'fieldId' | 'pageId', 'selectedKey'>,
) => {
  const context = await parsePageProps(props)

  return (
    <UpdateFieldPopoverContainer
      context={{
        ...context,
        type: IRouteType.Page,
      }}
    />
  )
}

export default Page

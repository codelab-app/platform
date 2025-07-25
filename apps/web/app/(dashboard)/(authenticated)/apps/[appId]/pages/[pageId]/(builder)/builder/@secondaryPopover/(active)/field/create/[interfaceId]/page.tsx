import type { PageProps } from '@codelab/frontend-abstract-types'

import { IRouteType } from '@codelab/frontend-abstract-application'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'
import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'

const Page = async (
  props: PageProps<'appId' | 'interfaceId' | 'pageId', 'selectedKey'>,
) => {
  const context = await parsePageProps(props)

  return (
    <CreateFieldPopover
      context={{
        ...context,
        type: IRouteType.Page,
      }}
    />
  )
}

export default Page

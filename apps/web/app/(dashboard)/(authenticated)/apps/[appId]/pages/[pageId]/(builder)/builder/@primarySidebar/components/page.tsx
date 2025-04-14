import type { PageProps } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { PageBuilderPrimarySidebarContainer } from '@codelab/frontend-application-builder/sections'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'appId' | 'pageId', 'selectedKey'>) => {
  const context = await parsePageProps(props)

  return (
    <PageBuilderPrimarySidebarContainer
      context={{
        ...context,
        type: IRouteType.Page,
      }}
    />
  )
}

export default Page

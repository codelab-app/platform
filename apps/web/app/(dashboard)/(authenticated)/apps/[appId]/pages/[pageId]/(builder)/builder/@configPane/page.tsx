import type { PageProps } from '@codelab/frontend-abstract-types'

import { IRouteType } from '@codelab/frontend-abstract-application'
import { ConfigPaneInspectorTabGroupContainer } from '@codelab/frontend-application-builder/sections'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'

const Page = async (props: PageProps<'appId' | 'pageId', 'selectedKey'>) => {
  const context = await parsePageProps(props)

  return (
    <ConfigPaneInspectorTabGroupContainer
      context={{
        ...context,
        type: IRouteType.Page,
      }}
    />
  )
}

export default Page

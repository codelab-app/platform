import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { ConfigPaneInspectorTabGroupContainer } from '@codelab/frontend-application-builder/sections'

const Page = async ({ params }: PageProps<'appId' | 'pageId'>) => {
  const { appId, pageId } = await params

  return (
    <ConfigPaneInspectorTabGroupContainer
      context={{
        params: {
          appId,
          pageId,
        },
        type: IRouteType.Page,
      }}
    />
  )
}

export default Page

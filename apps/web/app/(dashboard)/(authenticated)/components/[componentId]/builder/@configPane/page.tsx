import type { PageProps } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { ConfigPaneInspectorTabGroupContainer } from '@codelab/frontend-application-builder/sections'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'componentId', 'selectedKey'>) => {
  const context = await parsePageProps(props)

  return (
    <ConfigPaneInspectorTabGroupContainer
      context={{
        ...context,
        type: IRouteType.Component,
      }}
    />
  )
}

export default Page

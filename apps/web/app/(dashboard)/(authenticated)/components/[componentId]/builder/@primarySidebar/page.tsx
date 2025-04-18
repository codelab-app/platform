import type { PageProps } from '@codelab/frontend-abstract-types'

import { IRouteType } from '@codelab/frontend-abstract-application'
import { ComponentBuilderPrimarySidebarContainer } from '@codelab/frontend-application-builder/sections'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'componentId', 'selectedKey'>) => {
  const context = await parsePageProps(props)

  return (
    <ComponentBuilderPrimarySidebarContainer
      context={{
        ...context,
        type: IRouteType.Component,
      }}
    />
  )
}

export default Page

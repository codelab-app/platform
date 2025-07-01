import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { IRouteType } from '@codelab/frontend-abstract-application'
import { PageBuilderPrimarySidebarContainer } from '@codelab/frontend-application-builder/sections'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'

export const metadata: Metadata = {
  title: 'Page List | Codelab',
}

/**
 * Page needed here for default purposes
 */
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

import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { PageBuilderContainer } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'App Builder | Codelab',
}

const Page = async (props: PageProps<'appId' | 'pageId', 'selectedKey'>) => {
  const context = await parsePageProps(props)

  return (
    <PageBuilderContainer
      context={{
        ...context,
        type: IRouteType.Page,
      }}
    />
  )
}

Page.displayName = 'Page'

export default Page

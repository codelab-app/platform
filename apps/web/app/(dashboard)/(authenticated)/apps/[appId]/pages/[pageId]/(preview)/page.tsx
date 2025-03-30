import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { PagePreviewContainer } from '@codelab/frontend-application-builder/use-cases/page-preview'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'App Preview | Codelab',
}

const Page = async (props: PageProps<'appId' | 'pageId', 'selectedKey'>) => {
  const context = await parsePageProps(props)

  return (
    <PagePreviewContainer
      context={{
        ...context,
        type: IRouteType.Page,
      }}
    />
  )
}

export default Page

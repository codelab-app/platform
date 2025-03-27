import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { PageBuilderContainer } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'App Builder | Codelab',
}

const Page = async (props: PageProps<'appId' | 'pageId'>) => {
  const {
    params: { appId, pageId },
  } = await parsePageProps(props)

  return <PageBuilderContainer appId={appId} pageId={pageId} />
}

Page.displayName = 'Page'

export default Page

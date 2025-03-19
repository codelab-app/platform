import type { PageContextParams } from '@codelab/frontend/abstract/application'
import type { Metadata } from 'next'

import { PageBuilderContainer } from '@codelab/frontend-application-builder/use-cases/page-builder'

export const metadata: Metadata = {
  title: 'App Builder | Codelab',
}

const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return <PageBuilderContainer appId={appId} pageId={pageId} />
}

Page.displayName = 'Page'

export default Page

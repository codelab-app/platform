import type { PageContextParams } from '@codelab/frontend/abstract/application'
import type { Metadata } from 'next'

import { PageBuilderPrimarySidebarContainer } from '@codelab/frontend-application-builder/sections'

export const metadata: Metadata = {
  title: 'Page List | Codelab',
}

/**
 * Page needed here for default purposes
 */
const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return <PageBuilderPrimarySidebarContainer appId={appId} pageId={pageId} />
}

export default Page

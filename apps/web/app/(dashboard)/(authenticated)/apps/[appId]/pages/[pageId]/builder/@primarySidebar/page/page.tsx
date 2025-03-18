import type { PageContextParams } from '@codelab/frontend/abstract/application'
import type { Metadata } from 'next'

import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { PagePrimarySidebarContainer } from '@codelab/frontend-application-builder/sections'

export const metadata: Metadata = {
  title: 'Page List | Codelab',
}

const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return (
    <PagePrimarySidebarContainer
      appId={appId}
      pageId={pageId}
      type={ExplorerPaneType.PageList}
    />
  )
}

export default Page

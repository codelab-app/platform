import type { Metadata } from 'next'

import {
  ExplorerPaneType,
  type PageContextParams,
} from '@codelab/frontend/abstract/types'

import { PagePrimarySidebarContainer } from './page.client'

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

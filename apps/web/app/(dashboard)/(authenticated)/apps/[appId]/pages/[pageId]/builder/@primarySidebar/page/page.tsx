import type { PageContextParams } from '@codelab/frontend/abstract/application'
import type { Metadata } from 'next'

import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { PageBuilderPrimarySidebarContainer } from '@codelab/frontend-application-builder/sections'
import {
  PageListPrimarySidebar,
  PageListPrimarySidebarContainer,
} from '@codelab/frontend-application-page/views'

export const metadata: Metadata = {
  title: 'Page List | Codelab',
}

const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return <PageListPrimarySidebarContainer appId={appId} pageId={pageId} />
}

export default Page

import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { PagePrimarySidebarContainer } from './page.client'

const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return <PagePrimarySidebarContainer appId={appId} pageId={pageId} />
}

export default Page

import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { PrimarySidebar } from '@codelab/frontend-application-builder/sections'

const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return <PrimarySidebar appId={appId} pageId={pageId} />
}

export default Page

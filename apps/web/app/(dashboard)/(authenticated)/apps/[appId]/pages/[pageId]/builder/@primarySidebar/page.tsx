import type { PageContextParams } from '@codelab/frontend/abstract/application'

import { PageBuilderPrimarySidebarContainer } from '@codelab/frontend-application-builder/sections'

const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return <PageBuilderPrimarySidebarContainer appId={appId} pageId={pageId} />
}

export default Page

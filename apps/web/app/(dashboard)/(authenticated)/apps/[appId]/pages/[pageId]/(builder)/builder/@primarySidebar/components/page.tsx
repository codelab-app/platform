import type { PageProps } from '@codelab/frontend/abstract/types'

import { PageBuilderPrimarySidebarContainer } from '@codelab/frontend-application-builder/sections'

const Page = async ({ params }: PageProps<'appId' | 'pageId'>) => {
  const { appId, pageId } = await params

  return <PageBuilderPrimarySidebarContainer appId={appId} pageId={pageId} />
}

export default Page

import type { PageContextParams } from '@codelab/frontend/abstract/application'

import { CreatePagePopoverContainer } from '@codelab/frontend-application-page/use-cases/create-page'

const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return <CreatePagePopoverContainer appId={appId} pageId={pageId} />
}

export default Page

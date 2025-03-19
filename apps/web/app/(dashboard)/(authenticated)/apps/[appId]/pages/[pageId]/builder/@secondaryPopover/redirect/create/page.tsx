import type { PageContextParams } from '@codelab/frontend/abstract/application'

import { CreateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/create-redirect'

const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return <CreateRedirectPopover params={{ appId, pageId }} />
}

export default Page

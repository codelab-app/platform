import type { PageProps } from '@codelab/frontend/abstract/types'

import { CreatePagePopoverContainer } from '@codelab/frontend-application-page/use-cases/create-page'

const Page = async ({ params }: PageProps<'appId' | 'pageId'>) => {
  const { appId, pageId } = await params

  return <CreatePagePopoverContainer appId={appId} pageId={pageId} />
}

export default Page

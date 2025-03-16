import type { PageContextParams } from '@codelab/frontend/abstract/types'

import {
  CreatePagePopover,
  CreatePagePopoverContainer,
} from '@codelab/frontend-application-page/use-cases/create-page'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'
import { use } from 'react'

const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return <CreatePagePopoverContainer appId={appId} pageId={pageId} />
}

export default Page

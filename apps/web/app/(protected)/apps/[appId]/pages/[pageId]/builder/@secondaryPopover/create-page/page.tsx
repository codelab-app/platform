'use client'

import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { CreateElementPopover } from '@codelab/frontend-application-element/use-cases/create-element'
import { CreatePagePopover } from '@codelab/frontend-application-page/use-cases/create-page'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = ({ params: { appId, pageId } }: { params: PageContextParams }) => {
  return (
    <DashboardPopover>
      <CreatePagePopover appId={appId} pageId={pageId} />
    </DashboardPopover>
  )
}

export default Page

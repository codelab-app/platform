'use client'
import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { CreatePagePopover } from '@codelab/frontend-application-page/use-cases/create-page'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'
import { use } from 'react'

const Page = (props: { params: Promise<PageContextParams> }) => {
  const params = use(props.params)
  const { appId, pageId } = params

  return (
    <DashboardPopover>
      <CreatePagePopover appId={appId} pageId={pageId} />
    </DashboardPopover>
  )
}

export default Page

'use client'

import { CreateTagPopover } from '@codelab/frontend-application-tag/use-cases/create-tag'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  return (
    <DashboardPopover>
      <CreateTagPopover />
    </DashboardPopover>
  )
}

export default Page

'use client'

import { CreateActionPopover } from '@codelab/frontend-application-store/use-cases/create-action'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  return (
    <DashboardPopover>
      <CreateActionPopover />
    </DashboardPopover>
  )
}

export default Page

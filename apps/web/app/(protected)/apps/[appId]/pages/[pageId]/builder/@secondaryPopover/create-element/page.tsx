'use client'

import { CreateElementPopover } from '@codelab/frontend-application-element/use-cases/create-element'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  return (
    <DashboardPopover>
      <CreateElementPopover />
    </DashboardPopover>
  )
}

export default Page

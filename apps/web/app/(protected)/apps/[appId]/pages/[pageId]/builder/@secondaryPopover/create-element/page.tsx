'use client'

import { tracker } from '@codelab/frontend/infra/logger'
import { CreateElementPopover } from '@codelab/frontend-application-element/use-cases/create-element'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  tracker.useRenderedCount('CreateElement@secondaryPopover')

  return (
    <DashboardPopover>
      <CreateElementPopover />
    </DashboardPopover>
  )
}

export default Page

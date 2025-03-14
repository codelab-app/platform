'use client'

import { CreateResourcePopover } from '@codelab/frontend-application-resource/use-cases/create-resource'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  return (
    <DashboardPopover>
      <CreateResourcePopover />
    </DashboardPopover>
  )
}

export default Page

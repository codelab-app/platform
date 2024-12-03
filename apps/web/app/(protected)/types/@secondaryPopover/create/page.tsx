'use client'

import { CreateTypePopover } from '@codelab/frontend-application-type/use-cases/create-type'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  return (
    <DashboardPopover>
      <CreateTypePopover />
    </DashboardPopover>
  )
}

export default Page

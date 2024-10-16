'use client'

import { CreateAtomPopover } from '@codelab/frontend-application-atom/use-cases/create-atom'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  return (
    <DashboardPopover>
      <CreateAtomPopover />
    </DashboardPopover>
  )
}

export default Page

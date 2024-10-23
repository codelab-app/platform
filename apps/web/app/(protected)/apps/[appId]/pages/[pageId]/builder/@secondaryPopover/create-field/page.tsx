'use client'

import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  return (
    <DashboardPopover>
      <CreateFieldPopover />
    </DashboardPopover>
  )
}

export default Page

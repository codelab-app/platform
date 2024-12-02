'use client'

import { UpdateFieldPopover } from '@codelab/frontend-application-type/use-cases/update-field'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  return (
    <DashboardPopover>
      <UpdateFieldPopover />
    </DashboardPopover>
  )
}

export default Page

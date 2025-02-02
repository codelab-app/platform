'use client'

import { UpdateActionPopover } from '@codelab/frontend-application-store/use-cases/update-action'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPopover>
      <UpdateActionPopover id={id} />
    </DashboardPopover>
  )
}

export default Page

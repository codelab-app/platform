'use client'

import { UpdateActionPopover } from '@codelab/frontend-application-store/use-cases/update-action'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = ({ params: { actionId } }: { params: { actionId: string } }) => {
  return (
    <DashboardPopover>
      <UpdateActionPopover id={actionId} />
    </DashboardPopover>
  )
}

export default Page

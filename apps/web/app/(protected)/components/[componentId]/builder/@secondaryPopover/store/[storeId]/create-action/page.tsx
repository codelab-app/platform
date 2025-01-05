'use client'

import { CreateActionPopover } from '@codelab/frontend-application-store/use-cases/create-action'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = ({ params: { storeId } }: { params: { storeId: string } }) => {
  return (
    <DashboardPopover>
      <CreateActionPopover id={storeId} />
    </DashboardPopover>
  )
}

export default Page

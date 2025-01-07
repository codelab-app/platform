'use client'

import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = ({
  params: { interfaceId },
}: {
  params: { interfaceId: string }
}) => {
  return (
    <DashboardPopover>
      <CreateFieldPopover interfaceId={interfaceId} />
    </DashboardPopover>
  )
}

export default Page

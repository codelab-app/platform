'use client'
import { CreateActionPopover } from '@codelab/frontend-application-store/use-cases/create-action'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'
import { use } from 'react'

const Page = (props: { params: Promise<{ storeId: string }> }) => {
  const params = use(props.params)
  const { storeId } = params

  return (
    <DashboardPopover>
      <CreateActionPopover storeId={storeId} />
    </DashboardPopover>
  )
}

export default Page

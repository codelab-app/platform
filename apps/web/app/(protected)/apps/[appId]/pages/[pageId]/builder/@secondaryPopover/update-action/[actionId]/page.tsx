'use client'
import { UpdateActionPopover } from '@codelab/frontend-application-store/use-cases/update-action'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'
import { use } from 'react'

const Page = (props: { params: Promise<{ actionId: string }> }) => {
  const params = use(props.params)
  const { actionId } = params

  return <UpdateActionPopover id={actionId} />
}

export default Page

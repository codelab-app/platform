'use client'
import { UpdateActionPopover } from '@codelab/frontend-application-store/use-cases/update-action'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'
import { use } from 'react'

const Page = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params)
  const { id } = params

  return <UpdateActionPopover id={id} />
}

export default Page

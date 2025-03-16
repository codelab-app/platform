import type { Metadata } from 'next'

import { UpdateTypePopover } from '@codelab/frontend-application-type/use-cases/update-type'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

export const metadata: Metadata = {
  title: 'Update Type | Codelab',
}

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  return <UpdateTypePopover id={id} />
}

export default Page

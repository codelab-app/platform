import type { Metadata } from 'next'

import { UpdateAtomPopoverContainer } from '@codelab/frontend-application-atom/use-cases/update-atom'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

export const metadata: Metadata = {
  title: 'Update Atom | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <UpdateAtomPopoverContainer id={id} />
}

export default Page

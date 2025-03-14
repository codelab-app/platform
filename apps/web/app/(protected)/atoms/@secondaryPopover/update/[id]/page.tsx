import type { Metadata } from 'next'

import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

import { UpdateAtomContainer } from './page.client'

export const metadata: Metadata = {
  title: 'Update Atom | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <UpdateAtomContainer id={id} />
}

export default Page

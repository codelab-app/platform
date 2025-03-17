import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { UpdateTagPopoverContainer } from '@codelab/frontend-application-tag/use-cases/update-tag'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

export const metadata: Metadata = {
  title: 'Update Tag | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <UpdateTagPopoverContainer id={id} />
}

export default Page

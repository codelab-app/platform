import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { UpdateResourcePopoverContainer } from '@codelab/frontend-application-resource/use-cases/update-resource'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

export const metadata: Metadata = {
  title: 'Update Resource | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <UpdateResourcePopoverContainer id={id} />
}

export default Page

import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import {
  UpdateAuthGuardPopover,
  UpdateAuthGuardPopoverContainer,
} from '@codelab/frontend-application-auth-guard/use-cases/update-auth-guard'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

export const metadata: Metadata = {
  title: 'Update Auth Guard | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <UpdateAuthGuardPopoverContainer id={id} />
}

export default Page

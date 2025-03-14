import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { CreateDomainModal } from '@codelab/frontend-application-domain/use-cases/create-domain'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export const metadata: Metadata = {
  title: 'Create Domain | Codelab',
}

const Page = async (props: { params: Promise<{ appId: string }> }) => {
  const params = await props.params
  const { appId } = params

  return <CreateDomainModal appId={appId} />
}

export default Page

import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { DomainUpdateContainer } from './page.client'

export const metadata: Metadata = {
  title: 'Update Domain | Codelab',
}

const Page = async ({ params }: { params: Promise<{ domainId: string }> }) => {
  const { domainId } = await params

  return <DomainUpdateContainer id={domainId} />
}

export default Page

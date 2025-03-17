import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { UpdateDomainModalContainer } from '@codelab/frontend-application-domain/use-cases/update-domain'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export const metadata: Metadata = {
  title: 'Update Domain | Codelab',
}

const Page = async ({ params }: { params: Promise<{ domainId: string }> }) => {
  const { domainId } = await params

  return <UpdateDomainModalContainer id={domainId} />
}

export default Page

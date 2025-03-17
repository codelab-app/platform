import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeleteDomainModalContainer } from '@codelab/frontend-application-domain/use-cases/delete-domain'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export const metadata: Metadata = {
  title: 'Delete Domain | Codelab',
}

const Page = async (props: { params: Promise<{ domainId: string }> }) => {
  const params = await props.params
  const { domainId } = params

  return <DeleteDomainModalContainer id={domainId} />
}

export default Page

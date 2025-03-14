import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { DomainDeleteContainer } from './page.client'

export const metadata: Metadata = {
  title: 'Delete Domain | Codelab',
}

const Page = async (props: { params: Promise<{ domainId: string }> }) => {
  const params = await props.params
  const { domainId } = params

  return <DomainDeleteContainer id={domainId} />
}

export default Page

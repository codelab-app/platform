import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DomainListContainer } from '@codelab/frontend-application-domain/use-cases/domain-list'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'

export const metadata: Metadata = {
  // description: '...',
  title: 'Domains | Codelab',
}

const DomainsPage = async (props: { params: Promise<{ appId: string }> }) => {
  const params = await props.params
  const { appId } = params

  return (
    <ContentSection>
      <DomainListContainer appId={appId} />
    </ContentSection>
  )
}

export default DomainsPage

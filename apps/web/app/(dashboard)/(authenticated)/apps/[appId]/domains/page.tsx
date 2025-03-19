import type { Metadata } from 'next'

import { DomainListContainer } from '@codelab/frontend-application-domain/use-cases/domain-list'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'

export const metadata: Metadata = {
  // description: '...',
  title: 'Domains | Codelab',
}

const DomainsPage = async ({
  params,
}: {
  params: Promise<{ appId: string }>
}) => {
  const { appId } = await params

  return (
    <ContentSection>
      <DomainListContainer appId={appId} />
    </ContentSection>
  )
}

export default DomainsPage

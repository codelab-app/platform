import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { CreateDomainModal } from '@codelab/frontend-application-domain/use-cases/create-domain'
import { DeleteDomainModal } from '@codelab/frontend-application-domain/use-cases/delete-domain'
import { UpdateDomainModal } from '@codelab/frontend-application-domain/use-cases/update-domain'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'

import { DomainListContainer } from './page.container'

export const metadata: Metadata = {
  // description: '...',
  title: 'Domains | Codelab',
}

const DomainsPage = async ({
  params: { appId },
}: {
  params: { appId: string }
}) => {
  const { items: appsDto } = await appRepository.find({ id: appId })
  const domainsDto = appsDto.flatMap((app) => app.domains)

  return (
    <>
      <CreateDomainModal />
      <ContentSection>
        <DomainStoreHydrator
          appsDto={appsDto}
          domainsDto={domainsDto}
          fallback={<Spinner />}
        >
          <DomainListContainer />
        </DomainStoreHydrator>
      </ContentSection>
    </>
  )
}

export default DomainsPage

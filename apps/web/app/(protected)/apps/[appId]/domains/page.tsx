import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { CreateDomainModal } from '@codelab/frontend-application-domain/use-cases/create-domain'
import {
  DomainList,
  domainListQuery,
} from '@codelab/frontend-application-domain/use-cases/domain-list'
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
  const { apps } = await domainListQuery({ id: appId })

  return (
    <>
      <CreateDomainModal />
      {/*
        <DeleteDomainModal />
        <UpdateDomainModal /> */}
      <ContentSection>
        <DomainStoreHydrator appsDto={apps} fallback={<Spinner />}>
          <DomainListContainer />
        </DomainStoreHydrator>
      </ContentSection>
    </>
  )
}

export default DomainsPage

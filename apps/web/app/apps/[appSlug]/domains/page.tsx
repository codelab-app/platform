import { CreateDomainModal } from '@codelab/frontend-application-domain/use-cases/create-domain'
import {
  DomainList,
  domainListUseCase,
} from '@codelab/frontend-application-domain/use-cases/domain-list'
import { DomainsPageHeader } from '@codelab/frontend-application-domain/views'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'
import React from 'react'
import { StoreHydrator } from '../../../../components'

export const metadata: Metadata = {
  // description: '...',
  title: 'Domains | Codelab',
}

const DomainsPage = async ({
  params: { appSlug },
}: {
  params: { appSlug: string }
}) => {
  const { apps, atoms } = await domainListUseCase({ slug: appSlug })

  return (
    <StoreHydrator apps={apps} atoms={atoms}>
      <CreateDomainModal />
      {/* 
        <DeleteDomainModal />
        <UpdateDomainModal /> */}

      <ContentSection>
        <DomainList />
      </ContentSection>
    </StoreHydrator>
  )
}

export default DomainsPage

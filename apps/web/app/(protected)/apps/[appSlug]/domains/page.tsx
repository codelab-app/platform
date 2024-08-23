import { StoreHydrator } from '@codelab/frontend/infra/context'
import { CreateDomainModal } from '@codelab/frontend-application-domain/use-cases/create-domain'
import {
  DomainList,
  domainListQuery,
} from '@codelab/frontend-application-domain/use-cases/domain-list'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Domains | Codelab',
}

const DomainsPage = async ({
  params: { appSlug },
}: {
  params: { appSlug: string }
}) => {
  const { apps } = await domainListQuery({ slug: appSlug })

  return (
    <StoreHydrator appsDto={apps}>
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

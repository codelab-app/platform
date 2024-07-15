import { CreateDomainModal } from '@codelab/frontend-application-domain/use-cases/create-domain'
import { DeleteDomainModal } from '@codelab/frontend-application-domain/use-cases/delete-domain'
import {
  domainListUseCase,
  GetDomainsList,
} from '@codelab/frontend-application-domain/use-cases/get-domains'
import { UpdateDomainModal } from '@codelab/frontend-application-domain/use-cases/update-domain'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Domains | Codelab',
}

const DomainsPage = async ({
  params: { appId, userId },
}: {
  params: {
    userId: string
    appId: string
  }
}) => {
  const domains = await domainListUseCase({ id: appId })
  // const { appName } = useAppQuery()

  // using loadAppsPreview in order to make sure that the domains are hydrated
  // otherwise the domains list would appear empty
  // const [{ status }, loadAppWithDomains] = useAsync(() =>
  //   appService.loadAppsPreview({
  //     compositeKey: AppProperties.appCompositeKey(appName, user),
  //   }),
  // )

  // useMountEffect(loadAppWithDomains.execute)

  return (
    <>
      <CreateDomainModal />
      <DeleteDomainModal />
      <UpdateDomainModal />

      <ContentSection>
        <GetDomainsList domains={domains} />
      </ContentSection>
    </>
  )
}

export default DomainsPage

// export const getServerSideProps = withPageAuthRedirect()

// DomainsView.Layout = DomainsViewLayout

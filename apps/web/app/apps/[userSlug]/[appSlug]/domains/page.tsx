import { useAppQuery } from '@codelab/frontend/presentation/container'
import { CreateDomainModal } from '@codelab/frontend-application-domain/use-cases/create-domain'
import { DeleteDomainModal } from '@codelab/frontend-application-domain/use-cases/delete-domain'
import { GetDomainsList } from '@codelab/frontend-application-domain/use-cases/get-domains'
import { UpdateDomainModal } from '@codelab/frontend-application-domain/use-cases/update-domain'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { AppProperties } from '@codelab/shared/domain'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Spin } from 'antd'
import Head from 'next/head'
import React from 'react'

const DomainsRoute = ({
  params: { appSlug, userSlug },
}: {
  params: {
    userSlug: string
    appSlug: string
  }
}) => {
  const { appService, userService } = useStore()
  const user = userService.user
  const { appName } = useAppQuery()

  // using loadAppsPreview in order to make sure that the domains are hydrated
  // otherwise the domains list would appear empty
  const [{ status }, loadAppWithDomains] = useAsync(() =>
    appService.loadAppsPreview({
      compositeKey: AppProperties.appCompositeKey(appName, user),
    }),
  )

  useMountEffect(loadAppWithDomains.execute)

  return (
    <>
      <Head>
        <title>{appName} | Domains | Codelab</title>
      </Head>

      <CreateDomainModal />
      <DeleteDomainModal />
      <UpdateDomainModal />

      <ContentSection>
        {status === 'loading' ? <Spin /> : <GetDomainsList />}
      </ContentSection>
    </>
  )
}

export default DomainsRoute

// export const getServerSideProps = withPageAuthRedirect()

// DomainsView.Layout = DomainsViewLayout

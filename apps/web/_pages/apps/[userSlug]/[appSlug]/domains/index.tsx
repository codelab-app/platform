import {
  CreateDomainModal,
  DeleteDomainModal,
  type DomainsView,
  DomainsViewLayout,
  GetDomainsList,
  UpdateDomainModal,
} from '@codelab/frontend-application-domain'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useAppQuery } from '@codelab/frontend/presentation/container'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { AppProperties } from '@codelab/shared/domain'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Spin } from 'antd'
import Head from 'next/head'
import React from 'react'

const DomainsView: DomainsView = (props) => {
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

export default DomainsView

export const getServerSideProps = withPageAuthRedirect()

DomainsView.Layout = DomainsViewLayout

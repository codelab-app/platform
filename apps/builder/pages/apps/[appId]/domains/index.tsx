import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { useCurrentApp } from '@codelab/frontend/domain/app'
import {
  CreateDomainButton,
  CreateDomainModal,
  DeleteDomainModal,
  GetDomainsList,
  UpdateDomainModal,
} from '@codelab/frontend/domain/domain'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { ContentSection } from '@codelab/frontend/view/sections'
import type { DashboardTemplateProps } from '@codelab/frontend/view/templates'
import {
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { PageHeader, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useAsync } from 'react-use'

const DomainsPageHeader = observer(() => {
  const { domainService } = useStore()

  const pageHeaderButtons = [
    <CreateDomainButton domainService={domainService} key={0} />,
  ]

  const router = useRouter()
  const onBack = () => router.push('/apps')

  return (
    <PageHeader
      extra={pageHeaderButtons}
      ghost={false}
      onBack={onBack}
      title="Domains"
    />
  )
})

const DomainsPage: CodelabPage<DashboardTemplateProps> = (props) => {
  const { appService, domainService, userService } = useStore()
  const appId = useCurrentAppId()
  const { app } = useCurrentApp(appService)

  const { loading, value } = useAsync(
    () => domainService.getAll({ appConnection: { node: { id: appId } } }),
    [],
  )

  return (
    <>
      <Head>
        <title>{app?.name ? `${app.name} | ` : ''} Domains | Codelab</title>
      </Head>

      <CreateDomainModal
        domainService={domainService}
        userService={userService}
      />
      <DeleteDomainModal domainService={domainService} />
      <UpdateDomainModal
        domainService={domainService}
        userService={userService}
      />

      <ContentSection>
        {loading && <Spin />}
        {!loading && <GetDomainsList domainService={domainService} />}
      </ContentSection>
    </>
  )
}

export default DomainsPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

DomainsPage.Layout = (page) => {
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return (
    <DashboardTemplate
      Header={DomainsPageHeader}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {page.children}
    </DashboardTemplate>
  )
}

import { CodelabPage } from '@codelab/frontend/abstract/types'
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
  useStore,
} from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  ContentSection,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
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
  const { appService, userService, domainService } = useStore()
  const appId = useCurrentAppId()
  const { app } = useCurrentApp(appService)

  const { value, loading } = useAsync(
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
      <DeleteDomainModal
        domainService={domainService}
        userService={userService}
      />
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
  const { userService } = useStore()

  return (
    <DashboardTemplate
      Header={DomainsPageHeader}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[
            appMenuItem,
            allPagesMenuItem(userService.user?.curAppId),
            pageBuilderMenuItem(
              userService.user?.curAppId,
              userService.user?.curPageId,
            ),
            resourceMenuItem,
          ]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {page.children}
    </DashboardTemplate>
  )
}

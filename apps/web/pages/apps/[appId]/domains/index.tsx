import { auth0Instance } from '@codelab/backend'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useCurrentApp } from '@codelab/frontend/modules/app'
import {
  CreateDomainButton,
  CreateDomainModal,
  DeleteDomainModal,
  GetDomainsList,
  UpdateDomainModal,
} from '@codelab/frontend/modules/domain'
import {
  useCurrentAppId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import {
  adminMenuItems,
  appMenuItem,
  ContentSection,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

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

  const [, { isLoading }] = useStatefulExecutor(
    () =>
      (domainService as any).getAll(
        { appConnection: { node: { id: appId } } },
        true,
      ),
    {
      executeOnMount: true,
    },
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
        {isLoading && <Spin />}
        {!isLoading && <GetDomainsList domainService={domainService} />}
      </ContentSection>
    </>
  )
}

export default DomainsPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

DomainsPage.Layout = (page) => {
  return (
    <DashboardTemplate
      Header={DomainsPageHeader}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[appMenuItem]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {page.children}
    </DashboardTemplate>
  )
}

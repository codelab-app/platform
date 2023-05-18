import { PlusOutlined } from '@ant-design/icons'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateDomainModal,
  DeleteDomainModal,
  GetDomainsList,
  UpdateDomainModal,
} from '@codelab/frontend/domain/domain'
import {
  Header,
  HeaderBreadcrumb,
  HeaderToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/presentation/view'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Image, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useMemo } from 'react'
import tw from 'twin.macro'

const DomainsPageHeader = observer(() => {
  const { appService, domainService } = useStore()
  const appId = useCurrentAppId()

  const appName = useMemo(
    () => (appId ? appService.app(appId)?.name : ''),
    [appId],
  )

  return (
    <Header
      direction={
        <HeaderBreadcrumb
          items={[{ title: appName || '?' }, { title: 'Domains' }]}
        />
      }
      logo={
        <Image
          alt="codelab logo"
          css={tw`w-full h-full`}
          preview={false}
          src="/logo.png"
        />
      }
      toolbar={
        <HeaderToolbar
          items={[
            {
              icon: <PlusOutlined />,
              key: '0',
              onClick: () => domainService.createModal.open(),
              title: 'Create Domain',
            },
          ]}
          title="Domains toolbar"
        />
      }
    />
  )
})

const DomainsPage: CodelabPage<DashboardTemplateProps> = (props) => {
  const { appService } = useStore()
  const appId = useCurrentAppId()

  const [{ result: app, status }, getApp] = useAsync(() =>
    appService.getOne(appId),
  )

  useMountEffect(getApp.execute)

  return (
    <>
      <Head>
        <title>{app?.name ? `${app.name} | ` : ''} Domains | Codelab</title>
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

export default DomainsPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

DomainsPage.Layout = ({ children }) => {
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return (
    <DashboardTemplate
      Header={DomainsPageHeader}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {children()}
    </DashboardTemplate>
  )
}
